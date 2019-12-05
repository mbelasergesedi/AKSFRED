import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
@Component({
  selector: 'app-infosdetails',
  templateUrl: './infosdetails.component.html',
  styleUrls: ['./infosdetails.component.scss'],
})
export class InfosdetailsComponent implements OnInit {

  itemCollection: any;
  items: Observable<[any]>;
  enregistrement: any;
  categorie: string;
  key: string;
  notifs: any;
  platform: any;
  toastCtrl: any;
  url: string;
  image: string;
  message: string;
  constructor(private route: ActivatedRoute, private db: AngularFirestore,

  ) { }

  ngOnInit() {
    // This would print out the json object which contained
    // all of our query parameters for this particular route.
    this.route.queryParams.subscribe(params => {
      console.log(params.key);
      this.categorie = params.categorie;
      this.itemCollection = this.db.collection<any[]>('notifications', ref => ref.where('key', '==',
        params.key));
      this.items = this.itemCollection.valueChanges().subscribe((val: any) => {
        this.notifs = val;
       //console.log(this.notifs);
      }
      );
    });
  }
}
