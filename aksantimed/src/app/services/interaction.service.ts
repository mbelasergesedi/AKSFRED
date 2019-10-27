import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { InteractionComponent } from '../tab3/interaction/interaction.component';
import { Injectable } from '@angular/core';


@Injectable()
export class InteractionSearch {

  private dbPath = '/interactions';

  interactionRef: AngularFireList<InteractionComponent> = null;

  constructor(private db: AngularFireDatabase) {
    this.interactionRef = db.list(this.dbPath);
  }

  createInteraction(interaction: InteractionComponent): void {
    this.interactionRef.push(interaction);
  }

  updateInteractioni(key: string, value: any): Promise<void> {
    return this.interactionRef.update(key, value);
  }

  deleteInteraction(key: string): Promise<void> {
    return this.interactionRef.remove(key);
  }

  getInteraction(): AngularFireList<InteractionComponent> {
    return this.interactionRef;
  }

  geInteractionList(key: string): AngularFireList<InteractionComponent> {
    return this.interactionRef;
  }

  deleteAll(): Promise<void> {
    return this.interactionRef.remove();
  }
}
