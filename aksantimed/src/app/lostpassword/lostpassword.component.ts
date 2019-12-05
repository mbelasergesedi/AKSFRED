import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AuthenticateService } from '../services/authentication.service';
import { ToastController } from '@ionic/angular';
import * as firebase from 'firebase';

@Component({
  selector: 'app-lostpassword',
  templateUrl: './lostpassword.component.html',
  styleUrls: ['./lostpassword.component.scss'],
})
export class LostpasswordComponent implements OnInit {
  // tslint:disable-next-line: variable-name
  validations_form: FormGroup;
  // tslint:disable-next-line: variable-name
  resetPassword_form: FormGroup;

  constructor(private authenticateService: AuthenticateService,
              private formBuilder: FormBuilder,
              private toastController: ToastController) { }

  // tslint:disable-next-line: variable-name
  validation_messages = {
    email: [
      { type: 'required', message: 'Un email est obligtoire.' },
      { type: 'pattern', message: 'Entrer une  adresse valide.' }
    ]
  };

  ngOnInit() {


    // Validations patterns
    this.resetPassword_form = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ]))
    });
  }
  resetPassword(email: string) {
    // tslint:disable-next-line: prefer-const
    let auth = firebase.auth();

    // tslint:disable-next-line: no-unused-expression
    console.log(this.resetPassword_form.value);
    return auth.sendPasswordResetEmail(this.resetPassword_form.value.email);
  }

  async lostPassword() {
    const toast = await this.toastController.create({
      message: 'Un email vous a été envoyé.',
      duration: 2000
    });
    toast.present();
  }
}
