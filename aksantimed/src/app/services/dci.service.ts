import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { InteractionComponent } from '../tab3/interaction/interaction.component';
import { Injectable } from '@angular/core';

@Injectable()
export class DciSearch {

  private dbPath = '/dci';

  dciRef: AngularFireList<InteractionComponent> = null;

  constructor(private db: AngularFireDatabase) {
    this.dciRef = db.list(this.dbPath);
  }

  createDci(interaction: InteractionComponent): void {
    this.dciRef.push(interaction);
  }

  updateDci(key: string, value: any): Promise<void> {
    return this.dciRef.update(key, value);
  }

  deleteDci(key: string): Promise<void> {
    return this.dciRef.remove(key);
  }

  getDci(): AngularFireList<InteractionComponent> {
    return this.dciRef;
  }

  geDciList(key: string): AngularFireList<InteractionComponent> {
    return this.dciRef;
  }

  deleteAll(): Promise<void> {
    return this.dciRef.remove();
  }
}
