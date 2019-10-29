import { Component, OnInit } from '@angular/core';
import { NotificationsService } from './notification.service';
import { map } from 'rxjs/operators';
import { AuthService } from './../services/AuthService';
import { ConnectionService } from 'ng-connection-service';

import { Subject } from 'rxjs';
import { stringify } from '@angular/compiler/src/util';
import { analytics } from 'firebase';
@Component({
  selector: 'app-tab1',
  templateUrl: './tab1.page.html',
  styleUrls: ['./tab1.page.scss'],
})
export class Tab1Page implements OnInit {
  interactions: any;
  userEmail: string;
  userName: string;
  startAt = new Subject();
  endAt = new Subject();
  status = '';
  isConnected = true;
  navCtrl: any;
  logged: any;

  constructor(
    private notificationService: NotificationsService,
    private authService: AuthService,
    private connectionService: ConnectionService
  ) { }

  ngOnInit() {
// tslint:disable-next-line: no-unused-expression
this.userEmail;
// tslint:disable-next-line: no-unused-expression
this.logged;

this.connectionService.monitor().subscribe(isConnected => {
      this.isConnected = isConnected;
      if (this.isConnected) {
        this.status = 'Connecté à Internet';
        console.log( this.status);
      } else {
        this.status = 'Pas de connection Internet';
        console.log( this.status);
      }
    });
if (this.authService.userDetails()) {
      this.userEmail = this.authService.userDetails().email;
      console.log(this.userEmail);
      this.logged = true;
      this.userName = this.authService.userDetails().displayName;
      console.log(this.userName);
    } else {
      this.logged = false;
    }

this.notificationService.getNotification().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(interactions => {
      this.interactions = interactions;
      console.log(interactions);
    });
  }


}
