import { Injectable } from '@angular/core';

import * as firebase from 'firebase';

@Injectable()
export class AuthService {
    userState: any;
        createNewUser(email: string, password: string) {
            return new Promise(
                (resolve, reject) => {
                    firebase.auth().createUserWithEmailAndPassword(email, password).then(
                        () => {
                            resolve();
                        },
                        (error) => {
                            reject(error);
                        }
                    );
                }
            );
        }

    signInUser(email: string, password: string) {
        return new Promise(
            (resolve, reject) => {
                firebase.auth().signInWithEmailAndPassword(email, password).then(
                    () => {
                        resolve();
                        localStorage.setItem('email', JSON.stringify(this.userState));
                    },
                    (error) => {
                        reject(error);
                    }
                );
            }
        );
    }

    signOutUser() {
        firebase.auth().signOut();
    }

    userDetails() {
        return firebase.auth().currentUser;
      }

}
