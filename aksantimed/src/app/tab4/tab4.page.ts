import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AuthenticateService } from '../services/authentication.service';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SchoolsService } from '../services/school.service';
import { VilleService } from '../services/city.service';
import { QryCustomerService } from '../services/customers.service';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Customers } from '../model/customers.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { File } from '@ionic-native/file/ngx';

import { environment } from '../environments/environment';
import * as firebase from 'firebase';
@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page {
  result;

  prof_form: FormGroup;

  errorMessage = '';
  enr: any;
  itemCollection: any;
  MyData: any;
  items: Observable<[any]>;
  enregistrement: any;
  [x: string]: any;
  list: Customers[];
  signupForm: FormGroup;

  successMessage: string;

  constructor(private formBuilder: FormBuilder,
              private authenticateService: AuthenticateService,
              private schoolsService: SchoolsService,
              private villeService: VilleService,
              private db: AngularFirestore,
              private camera: Camera,
              private file: File,
              private qryCustomerService: QryCustomerService,
              private router: Router) {

  }
  // tslint:disable-next-line: use-lifecycle-interface
  ngOnInit() {
    this.initForm();
    this.getVille();
    //firebase.initializeApp(environment.firebase);
  }

  async pickImage() {
    const options: CameraOptions = {
      quality: 80,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };

    try {
      const cameraInfo = await this.camera.getPicture(options);
      const blobInfo = await this.makeFileIntoBlob(cameraInfo);
      const uploadInfo: any = await this.uploadToFirebase(blobInfo);

      alert('File Upload Success ' + uploadInfo.fileName);
    } catch (e) {
      console.log(e.message);
      alert('File Upload Error ' + e.message);
    }
  }

  // FILE STUFF
  // tslint:disable-next-line: variable-name
  makeFileIntoBlob(_imagePath: string) {
    // INSTALL PLUGIN - cordova plugin add cordova-plugin-file
    return new Promise((resolve, reject) => {
      let fileName = "";
      this.file
        .resolveLocalFilesystemUrl(_imagePath)
        .then(fileEntry => {
          const { name, nativeURL } = fileEntry;

          // get the path..
          const path = nativeURL.substring(0, nativeURL.lastIndexOf('/'));
          console.log('path', path);
          console.log('fileName', name);

          fileName = name;

          // we are provided the name, so now read the file into
          // a buffer
          return this.file.readAsArrayBuffer(path, name);
        })
        .then(buffer => {
          // get the buffer and make a blob to be saved
          const imgBlob = new Blob([buffer], {
            type: 'image/jpeg'
          });
          console.log(imgBlob.type, imgBlob.size);
          resolve({
            fileName,
            imgBlob
          });
        })
        .catch(e => reject(e));
    });
  }

  /**
   *
   // tslint:disable-next-line: jsdoc-format
   // tslint:disable-next-line: no-redundant-jsdoc
   * @param _imageBlobInfo
   */
  uploadToFirebase(_imageBlobInfo) {
    console.log('uploadToFirebase');
    return new Promise((resolve, reject) => {
      const fileRef = firebase.storage().ref('images/' + _imageBlobInfo.fileName);

      const uploadTask = fileRef.put(_imageBlobInfo.imgBlob);

      uploadTask.on(
        'state_changed',
        // tslint:disable-next-line: variable-name
        (_snapshot: any) => {
          console.log(
            'snapshot progess ' +
            (_snapshot.bytesTransferred / _snapshot.totalBytes) * 100
          );
        },
        _error => {
          console.log(_error);
          reject(_error);
        },
        () => {
          // completion...
          resolve(uploadTask.snapshot);
        }
      );
    });
  }

  getVille() {
    this.villeService.getVille().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(ville => {
      this.villeRef = ville;
      this.ville = ville;
      console.log(this.ville);
    });
  }
  initForm() {
    // Validations patterns
    this.prof_form = this.formBuilder.group({
      nom: new FormControl('', Validators.compose([
        Validators.required
      ])),
      categorie: new FormControl('', Validators.compose([
        Validators.required
      ])),


    });
  }
  tryRegister() {
    const data = this.prof_form.value;
    // 1. On cherche si l'email de l'utilisateur est déjà présent dans la DB;
    console.log(this.prof_form.get('categorie').value);
    this.itemCollection = this.db.collection<any[]>('customers', ref => ref.where('profession', '==',
      this.prof_form.get('categorie').value));
    this.items = this.itemCollection.valueChanges().subscribe((val: any) => {
      this.enregistrement = val;
      // console.log(this.enregistrement);

      // 2. S'il n'est pas présent, on l'inscrit dans la DB et dans système d'authentification;
      //if (Object.keys(this.enregistrement).length === 0) {
      //  this.qryCustomerService.createCustomer(data);
      //// this.authenticateService.registerUser(this.prof_form.get('email').value, this.prof_form.get('password').value)
      ////  .then(res => {
      //  console.log(res);
      ///  this.errorMessage = '';
      ///  this.successMessage = 'Votre compte a été crée.';
      //}, err => {
      //console.log(err);
      ///  this.errorMessage = err.message;
      ///  this.successMessage = '';
      // });
      // 3. Sinon on le previent qu'il est déjà présent dans la DB;
      //} else { console.log('Utilisateur déjà présent'); }
    }
    );
  }
}
