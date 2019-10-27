import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Notification } from './notification.model';
import { Tab1Page } from './tab1.page';

import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

import * as firebase from 'firebase';
import { DataSnapshot } from '@angular/fire/database/interfaces';
import { AngularFirestoreCollection } from '@angular/fire/firestore';
@Injectable()
export class NotificationsService {
  private dbPath = '/notifications';
  notificationsRef: AngularFireList<Tab1Page>;

  constructor(private db: AngularFireDatabase) {
    this.notificationsRef = db.list(this.dbPath);
  }

  notifications: Notification[] = [];
  notificationsSubject = new Subject<Notification[]>();

  emitNotifications() {
    this.notificationsSubject.next(this.notifications);
  }

  saveNotifications() {
    firebase.database().ref('/notifications').set(this.notifications);
  }


  getNotifications() {
    firebase.database().ref('/notifications')
      .on('value', (data: DataSnapshot) => {
        this.notifications = data.val() ? data.val() : [];
        this.emitNotifications();
      }
      );
  }

  getNotification(): AngularFireList<Tab1Page> {
    return this.notificationsRef;
  }

}

