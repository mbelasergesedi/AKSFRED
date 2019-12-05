import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import { Tab1Page } from '../tab1/tab1.page';

@Injectable()
export class AuthenticateService {
  userState: any;
  constructor(private firestore: AngularFirestore) { }

  registerUser(email: string, password: string) {
    return new Promise<any>((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(
          res => resolve(res),
          err => reject(err));
    });
  }

  loginUser(value) {
    return new Promise<any>((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(value.email, value.password)
        .then(
          res => resolve(res),
          err => reject(err));

    });
  }
  resetPassword(value) {
    const auth = firebase.auth();
    return auth.sendPasswordResetEmail(value.email)
      .then(() => console.log('email sent'))
      .catch((error) => console.log(error));
  }

  logoutUser() {
    return new Promise((resolve, reject) => {
      if (firebase.auth().currentUser) {
        firebase.auth().signOut()
          .then(() => {
            return firebase.auth().currentUser;
            console.log('LOG Out');
            resolve();
          }).catch((error) => {
            reject();
          });
      }
    });
  }

  userDetails() {

    return firebase.auth().currentUser;
  }
}
