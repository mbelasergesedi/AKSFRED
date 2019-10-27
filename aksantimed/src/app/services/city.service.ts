
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { AccountComponent } from '../../app/tab3/account/account.component';
import { Injectable } from '@angular/core';


@Injectable()
export class VilleService {

  private dbPath = '/ville';

  villeRef: AngularFireList<AccountComponent> = null;

  constructor(private db: AngularFireDatabase) {
    this.villeRef = db.list(this.dbPath);
  }

  createVille(interaction: AccountComponent): void {
    this.villeRef.push(interaction);
  }

  updateVille(key: string, value: any): Promise<void> {
    return this.villeRef.update(key, value);
  }

  deleteVille(key: string): Promise<void> {
    return this.villeRef.remove(key);
  }

  getVille(): AngularFireList<AccountComponent> {
    return this.villeRef;
  }

  geVilleList(key: string): AngularFireList<AccountComponent> {
    return this.villeRef;
  }

  deleteAll(): Promise<void> {
    return this.villeRef.remove();
  }
}
