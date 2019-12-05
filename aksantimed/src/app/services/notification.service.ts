import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Notifs } from '../model/notifications.model';
@Injectable({
    providedIn: 'root'
})
export class NotifsService {
    private dbPath = '/notifications';
    notifsRef: AngularFireList<Notifs> = null;

    constructor(private db: AngularFireDatabase) {
        this.notifsRef = db.list(this.dbPath);
    }
    createNotif(notif: Notifs): void {
        this.notifsRef.push(notif);
    }
    updateNotif(key: string, value: any): Promise<void> {
        return this.notifsRef.update(key, value);
    }
    deleteNotif(key: string): Promise<void> {
        return this.notifsRef.remove(key);
    }
    getNotifsList(): AngularFireList<Notifs> {
        return this.notifsRef;
    }
    deleteAll(): Promise<void> {
        return this.notifsRef.remove();
    }

}

