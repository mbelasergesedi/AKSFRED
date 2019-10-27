import { Component, OnInit } from '@angular/core';
import { NotificationsService } from './notification.service';
import { map } from 'rxjs/operators';
import { AuthService } from './../services/AuthService';

import { Subject } from 'rxjs';
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

  constructor(
    private notificationService: NotificationsService,
    private authService: AuthService
  ) { }

  ngOnInit() {


    if (this.authService.userDetails()) {
      this.userEmail = this.authService.userDetails().email;
      console.log(this.userEmail);
      this.userName = this.authService.userDetails().displayName;
      console.log(this.userName);
    } else {

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
