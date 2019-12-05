import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { InteractionComponent } from '../../tab3/interaction/interaction.component';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable()
export class InteractionSearch {

  private dbPath = '/dci';

  interactionRef: AngularFireList<InteractionComponent> = null;

  constructor(private db: AngularFireDatabase) {
    this.interactionRef = db.list(this.dbPath);
  }

  createInteraction(interaction: InteractionComponent): void {
    this.interactionRef.push(interaction);
  }

  updateInteraction(key: string, value: any): Promise<void> {
    return this.interactionRef.update(key, value);
  }

  deleteInteraction(key: string): Promise<void> {
    return this.interactionRef.remove(key);
  }

  getInteractionList(): AngularFireList<InteractionComponent> {
    return this.interactionRef;
  }


  deleteAll(): Promise<void> {
    return this.interactionRef.remove();
  }
}