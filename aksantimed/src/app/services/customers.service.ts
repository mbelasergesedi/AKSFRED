import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';
import { AccountComponent } from '../tab3/account/account.component';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable, of, Subject } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';
import 'rxjs/add/operator/toPromise';
@Injectable()
export class QryCustomerService {


  code: string;
  mycode: string;
  private dbPath = '/customers';
  customerRef: AngularFireList<AccountComponent> = null;


  constructor(private firestore: AngularFirestore) {}

  form = new FormGroup({
    customerName: new FormControl(''),
    orderNumber: new FormControl(''),
    coffeeOrder: new FormControl(''),
    completed: new FormControl(false)
  });


  createCustomer(data) {
    return new Promise<any>((resolve, reject) => {
      this.firestore
        .collection('customers')
        .add(data)
        .then(res => {}, err => reject(err));
    });
  }

  updateCustomer(data) {
    return this.firestore
      .collection('customers')
      .doc(data.payload.doc.id)
      .set({ completed: false }, { merge: false });
  }

  getCustomer() {
    return this.firestore.collection(
      'customers').snapshotChanges();
  }

  deleteCustomer(data) {
    return this.firestore
      .collection('customers')
      .doc(data.payload.doc.id)
      .delete();
  }
}
