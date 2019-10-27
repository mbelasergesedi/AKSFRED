import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { ComplexeComponent } from '../../app/tab3/complexe/complexe.component';
import { Injectable } from '@angular/core';

@Injectable()
export class GaleniqueService {

  private dbPath = '/galenique';

  galeniqueRef: AngularFireList<ComplexeComponent> = null;

  constructor(private db: AngularFireDatabase) {
    this.galeniqueRef = db.list(this.dbPath);
  }

  createGalenique(galenique: ComplexeComponent): void {
    this.galeniqueRef.push(galenique);
  }

  updateGalenique(key: string, value: any): Promise<void> {
    return this.galeniqueRef.update(key, value);
  }

  deleteGalenique(key: string): Promise<void> {
    return this.galeniqueRef.remove(key);
  }

  getGalenique(): AngularFireList<ComplexeComponent> {
    return this.galeniqueRef;
  }

  getGaleniqueList(key: string): AngularFireList<ComplexeComponent> {
    return this.galeniqueRef;
  }

  deleteAll(): Promise<void> {
    return this.galeniqueRef.remove();
  }
}
