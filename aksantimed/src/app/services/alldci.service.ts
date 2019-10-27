import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';
import { AccountComponent } from '../tab3/account/account.component';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable, of, Subject } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';
@Injectable()
export class AlldciService {


    code: string;
    mycode: string;
    private dbPath = '/alldci';
    customerRef: AngularFireList<AccountComponent> = null;


    constructor(private firestore: AngularFirestore) { }

    form = new FormGroup({
        customerName: new FormControl(''),
        orderNumber: new FormControl(''),
        coffeeOrder: new FormControl(''),
        completed: new FormControl(false)
    });


    createAlldci(data) {
        return new Promise<any>((resolve, reject) => {
            this.firestore
                .collection('alldci')
                .add(data)
                .then(res => { }, err => reject(err));
        });
    }

    updateAlldci(data) {
        return this.firestore
            .collection('alldci')
            .doc(data.payload.doc.id)
            .set({ completed: true }, { merge: true });
    }

    getAlldci() {
        return this.firestore.collection(
            'alldci').snapshotChanges();
    }


    deleteAlldci(data) {
        return this.firestore
            .collection('alldci')
            .doc(data.payload.doc.id)
            .delete();
    }
}
