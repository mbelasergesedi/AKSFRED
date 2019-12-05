import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';
import { AccountComponent } from '../tab3/account/account.component';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable, of, Subject } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';
@Injectable()
export class QryQuotationsService {


  code: string;
  mycode: string;
  private dbPath = '/quotations';
  customerRef: AngularFireList<AccountComponent> = null;


  constructor(private firestore: AngularFirestore) {}

  form = new FormGroup({
    customerName: new FormControl(''),
    orderNumber: new FormControl(''),
    coffeeOrder: new FormControl(''),
    completed: new FormControl(false)
  });


  createQuotation(data) {
    return new Promise<any>((resolve, reject) => {
      this.firestore
        .collection('quotations')
        .add(data)
        .then(res => {}, err => reject(err));
    });
  }

  updateQuotation(data) {
    return this.firestore
      .collection('quotations')
      .doc(data.payload.doc.id)
      .set({ completed: true }, { merge: true });
  }

  getQuotation() {
    return this.firestore.collection(
      'quotations').snapshotChanges();
  }

  deleteQuotation(data) {
    return this.firestore
      .collection('quotations')
      .doc(data.payload.doc.id)
      .delete();
  }
}
