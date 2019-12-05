import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { AuthenticateService } from '../services/authentication.service';
import { SchoolsService } from '../services/school.service';

import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
import { map } from 'rxjs/operators';
import { Storage } from '@ionic/storage';
import { ToastController } from '@ionic/angular';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(

    private navCtrl: NavController,
    public authService: AuthenticateService,
    private formBuilder: FormBuilder,
    private geolocation: Geolocation,
    public storage: Storage,
    public toastController: ToastController,
    private schoolsService: SchoolsService

  ) {  // set a key/value
    storage.set('name', 'Sexy');

    // Or to get a key/value pair
    storage.get('age').then((val) => {
      console.log('Your age is', val);
    });
  }
  schools: any;
  userState: any;
  geoLatitude: number;
  geoLongitude: number;
  geoAccuracy: number;
  geoAddress: string;

  watchLocationUpdates: any;
  loading: any;
  isWatching: boolean;
  userEmail: string;
  // Geocoder configuration
  device: any;
  logged: boolean;
  // tslint:disable-next-line: variable-name
  validations_form: FormGroup;
  // tslint:disable-next-line: member-ordering
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
  async logoutToast() {
    const toast = await this.toastController.create({
      message: 'Vous êtes deconnecté.',
      duration: 2000
    });
    toast.present();
  }
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
    // Validations patterns
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

  resetPassword(value) {
    this.authService.resetPassword(value)
      .then(res => {
        this.errorMessage = '';
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
