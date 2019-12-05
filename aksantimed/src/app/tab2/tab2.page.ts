import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import {ResultatVerificationService, User} from '../services/verifcode.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { UniqueDeviceID } from '@ionic-native/unique-device-id/ngx';
@Component({

  selector: 'app-tab2',
  templateUrl: './tab2.page.html',
  styleUrls: ['./tab2.page.scss'],
})
export class Tab2Page implements OnInit {
  status = true;
  form: FormGroup;
  med: any;
  myResponse;
  code: any;
  latitude: number;
  longitude: number;
  cordonnees: number;

  constructor(private formBuilder: FormBuilder,
              private geolocation: Geolocation,
              private uniqueDeviceID: UniqueDeviceID,
              private resultatVerificationService: ResultatVerificationService,
              ) { }
              private votretext: Observable<User>;
  ngOnInit() {
    this.form = this.formBuilder.group({
      votretext: [null, Validators.compose([Validators.required, Validators.minLength(11), Validators.maxLength(12)])]
    });


    this.geolocation.getCurrentPosition().then((resp) => {
    }).catch((error) => {
      console.log('Error getting location', error);
    });

    const watch = this.geolocation.watchPosition();
    watch.subscribe((data) => {
      console.log(data.coords.latitude);
      this.latitude = data.coords.latitude;
      console.log(data.coords.longitude);
      this.longitude = data.coords.longitude;
      this.cordonnees = this.latitude;
      console.log(this.cordonnees);
    });

    this.uniqueDeviceID.get()
  .then((uuid: any) => console.log(uuid))
  .catch((error: any) => console.log(error));
  }
  submit() {
    if (this.form.valid) {
      const code = (this.form.value.votretext);
      this.code = this.resultatVerificationService.getResponse(code, this.cordonnees).subscribe((data) => {
        this.myResponse = data;
        console.log(data);
      });
    }
  }
}

