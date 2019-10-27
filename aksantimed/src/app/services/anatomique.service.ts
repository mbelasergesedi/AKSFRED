import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { AccountComponent } from '../../app/tab3/account/account.component';
import { Injectable } from '@angular/core';


@Injectable()
export class AnatomiqueService {

  private dbPath = '/anatomique';

  anatomiqueRef: AngularFireList<AccountComponent> = null;

  constructor(private db: AngularFireDatabase) {
    this.anatomiqueRef = db.list(this.dbPath);
  }

  createAnatomique(anatomique: AccountComponent): void {
    this.anatomiqueRef.push(anatomique);
  }

  updateAnatomique(key: string, value: any): Promise<void> {
    return this.anatomiqueRef.update(key, value);
  }

  deleteAnatomique(key: string): Promise<void> {
    return this.anatomiqueRef.remove(key);
  }

  getAnatomique(): AngularFireList<AccountComponent> {
    return this.anatomiqueRef;
  }

  getAnatomiqueList(key: string): AngularFireList<AccountComponent> {
    return this.anatomiqueRef;
  }

  deleteAll(): Promise<void> {
    return this.anatomiqueRef.remove();
  }
}
