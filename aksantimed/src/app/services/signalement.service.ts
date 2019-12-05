import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';
// import { AccountComponent } from '../tab3/account/account.component';
import { Tab4Page } from '../tab4/tab4.page'
import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
@Injectable()
export class QrySignalementService {
    code: string;
    mycode: string;
    private dbPath = '/signalement';
    customerRef: AngularFireList<Tab4Page> = null;


    constructor(private firestore: AngularFirestore) { }

    form = new FormGroup({
        customerName: new FormControl(''),
        orderNumber: new FormControl(''),
        coffeeOrder: new FormControl(''),
        completed: new FormControl(false)
    });


    signalmentCreate(data) {
        return new Promise<any>((resolve, reject) => {
            this.firestore
                .collection('signalement')
                .add(data)
                .then(res => { }, err => reject(err));
        });
    }

    updatesignalment(data) {
        return this.firestore
            .collection('signalement')
            .doc(data.payload.doc.id)
            .set({ completed: true }, { merge: true });
    }

    getsignalment() {
        return this.firestore.collection(
            'signalement').snapshotChanges();
    }

    deletesignalment(data) {
        return this.firestore
            .collection('signalement')
            .doc(data.payload.doc.id)
            .delete();
    }
}
