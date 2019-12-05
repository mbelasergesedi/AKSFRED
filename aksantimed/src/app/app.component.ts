import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthService } from './services/AuthService';
import { environment } from './environments/environment';
import * as firebase from 'firebase';
import { ConnectionService } from 'ng-connection-service';
import { FCM } from '@ionic-native/fcm/ngx';
import { Router } from '@angular/router';
import { FcmProvider } from './services/fcm.services';
import { ToastController } from '@ionic/angular';
import { Subject } from 'rxjs/Subject';
import { tap } from 'rxjs/operators';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  isConnected: any;
  status: string;

  constructor(
    private platform: Platform,
    private fcm: FCM,
    private router: Router,
    private toastCtrl: ToastController,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public authenticationService: AuthService,
    private connectionService: ConnectionService,
    private menu: MenuController
  ) {
    firebase.initializeApp(environment.firebase);
    this.connectionService.monitor().subscribe(isConnected => {
      this.isConnected = isConnected;
      if (this.isConnected) {
        this.status = 'Connecté à Internet';

        // tslint:disable-next-line: no-unused-expression
      } else {
        !this.isConnected;
      }
      {
        this.status = 'Pas Connecté à Internet';
      }
    });
    this.splashScreen.show();
    this.splashScreen.hide();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
    this.fcm.getToken().then(token => {
      console.log(token);
    });
    this.fcm.onTokenRefresh().subscribe(token => {
      console.log(token);
    });
    this.fcm.onNotification().subscribe(data => {
      console.log(data);
      if (data.wasTapped) {
        console.log('Received in background');
      } else {
        console.log('Received in foreground');
      }
    });
  }
}
