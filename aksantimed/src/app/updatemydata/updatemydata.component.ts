import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from '@angular/forms';
import { AuthenticateService } from '../services/authentication.service';
import { AuthService } from './../services/AuthService';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SchoolsService } from '../services/school.service';
import { VilleService } from '../services/city.service';
import { QryCustomerService } from '../services/customers.service';
import { ManageUsers } from '../services/manageUsers.service';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AngularFirestore } from '@angular/fire/firestore';
@Component({
  selector: 'app-updatemydata',
  templateUrl: './updatemydata.component.html',
  styleUrls: ['./updatemydata.component.scss']
})
export class UpdatemydataComponent implements OnInit {
  updateDataform: FormGroup;
  itemCollection: any;
  items: any;
  enregistrement: any;
  successMessage: string;
  schoolRef: any;
  school: any;
  villeRef: any;
  userEmail: string;
  civilite: any;
  device: any;
  email: any;
  geocoding: any;
  nom: any;
  gsm: any;
  prenom: any;
  structure: any;
  profession: any;
  ville: any;
  errorMessage: string;
  inter: any;
  dataId :any;
  favorites: any;

  constructor(
    private formBuilder: FormBuilder,
    private authenticateService: AuthenticateService,
    private schoolsService: SchoolsService,
    public authService: AuthService,
    private villeService: VilleService,
    private db: AngularFirestore,
    private qryCustomerService: QryCustomerService,
    private manageUsers: ManageUsers,
    private router: Router
  ) { }

  ngOnInit() {
    this.initForm();
    this.getVille();
    this.getSchool();
  }
  getVille() {
    this.villeService
      .getVille()
      .snapshotChanges()
      .pipe(
        map(changes =>
          changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
        )
      )
      .subscribe(ville => {
        this.villeRef = ville;
      });
  }

  getSchool() {
    this.schoolsService
      .getSchool()
      .snapshotChanges()
      .pipe(
        map(changes =>
          changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
        )
      )
      .subscribe(school => {
        this.schoolRef = school;
        this.school = school;

      });
  }
  initForm() {
    // Validations patterns
    // Validations patterns
    this.updateDataform = this.formBuilder.group({
      civilite: new FormControl('', Validators.compose([Validators.required])),
      nom: new FormControl('', Validators.compose([Validators.required])),
      prenom: new FormControl('', Validators.compose([Validators.required])),
      email: new FormControl('', Validators.compose([Validators.required])),
      gsm: new FormControl(
        '',
        Validators.compose([Validators.required, Validators.minLength(8)])
      )
    });
    this.userEmail = this.authService.userDetails().email;
    // 1. On cherche si l'email de l'utilisateur est déjà présent dans la DB;
    this.itemCollection = this.db.collection<any[]>('customers', ref =>
      ref.where('email', '==', this.authService.userDetails().email)
    );
    this.items = this.itemCollection.valueChanges().subscribe((val: any) => {
      this.enregistrement = val;
      // console.log(this.enregistrement[0]);


      this.nom = this.enregistrement[0].nom;
      this.prenom = this.enregistrement[0].prenom;
      this.gsm = this.enregistrement[0].gsm;
    });
  }

  updateRegister() {
    const data = this.updateDataform.value;
    this.gsm = this.enregistrement[0].gsm;

    this.itemCollection = this.db.collection<any[]>('customers', ref => ref.where('gsm', '==',
      this.gsm));

    this.items = this.itemCollection.valueChanges().subscribe((val: any) => {
      this.favorites = val;
      // console.log(this.favorites);
      // const dataId = this.favorites.docs[0].id;
      // console.log(dataId);
      this.db.collection('customers').doc('kZ1VE827kSMTS6fkags2').update
     ({gsm: 8888888});

    }
    );
  }
}
