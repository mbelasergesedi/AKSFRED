import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { AuthenticateService } from '../services/authentication.service';
import { SchoolsService } from '../services/school.service';

import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  schools: any;
  geoLatitude: number;
  geoLongitude: number;
  geoAccuracy: number;
  geoAddress: string;

  watchLocationUpdates: any;
  loading: any;
  isWatching: boolean;

  // Geocoder configuration
  geoencoderOptions: NativeGeocoderOptions = {
    useLocale: true,
    maxResults: 5
  };
  device: any;
  logged: boolean;
  constructor(

    private navCtrl: NavController,
    private authService: AuthenticateService,
    private formBuilder: FormBuilder,   
    private geolocation: Geolocation,
    private schoolsService: SchoolsService,
    private nativeGeocoder: NativeGeocoder

  ) { }


  // tslint:disable-next-line: variable-name
  validations_form: FormGroup;
  errorMessage = '';

  // tslint:disable-next-line: variable-name
  validation_messages = {
    email: [
      { type: 'required', message: 'Un email est obligtoire.' },
      { type: 'pattern', message: 'Entrer une  adresse valide.' }
    ],
    password: [
      { type: 'required', message: 'Un mot de passe est obligatoire.' },
      { type: 'minlength', message: 'Votre mot de passe doit contenir au moins 5 caractères.' }
    ]
  };

  ngOnInit() {
    this.schoolsService.getSchool().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(schools => {
      this.schools = schools;
     // console.log(schools);
    });
   // console.log('Device UUID is: ' + this.device.uuid);


    //Validations patterns
    this.validations_form = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required
      ])),
    });
  }
 // Get current coordinates of device
 getGeolocation() {
  this.geolocation.getCurrentPosition().then((resp) => {
    this.geoLatitude = resp.coords.latitude;
    this.geoLongitude = resp.coords.longitude;
    this.geoAccuracy = resp.coords.accuracy;
    console.log(this.geoLatitude);
   // this.getGeoencoder(this.geoLatitude,this.geoLongitude);
  // }).catch((error) => {
    // alert('Error getting location'+ JSON.stringify(error));
   });
}

  loginUser(value) {
    this.authService.loginUser(value)
      .then(res => {
        this.errorMessage = '';
        this.logged = true;
        this.navCtrl.navigateForward('tabs/tab1');
      }, err => {
        this.errorMessage = err.message;
      });
  }
  logoutUser() {
    return this.authService.logoutUser().then(() => {
      this.logged = false;
      this.navCtrl.navigateForward('tabs/tab1');
    });
  }

  goToRegisterPage() {
    this.navCtrl.navigateForward('/account');
  }
  goToRegisterPageStudent() {
    this.navCtrl.navigateForward('/students');
  }
}
