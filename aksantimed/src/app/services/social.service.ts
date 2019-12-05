import { Component, OnInit, Injectable} from '@angular/core';
import { ToastController, Platform} from '@ionic/angular';

@Injectable()
export class SocialProvider {

    constructor(
                private platform: Platform,
                private toastCtrl: ToastController) {
      }

      
}
