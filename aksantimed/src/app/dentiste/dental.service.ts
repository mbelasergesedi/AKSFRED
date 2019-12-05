import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Notifs } from '../model/notifications.model';
import { DentisteComponent } from './dentiste.component';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

@Injectable()
export class DentalService {
  items: Observable<[any]>;
  private dbPath = '/dental';
  notificationsRef: AngularFireList<DentisteComponent>;
  constructor(private db: AngularFireDatabase) {
    this.notificationsRef = db.list(this.dbPath);
  }
  Notifs: Notifs[] = [];
  notificationsSubject = new Subject<Notifs[]>();
  getNotification(): AngularFireList<DentisteComponent> {
    return this.notificationsRef;
  }
}

