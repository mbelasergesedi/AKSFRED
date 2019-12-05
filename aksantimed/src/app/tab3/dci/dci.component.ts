import { Component, OnInit } from '@angular/core';
import { map, debounceTime } from 'rxjs/operators';
import { DciSearch } from '../../services/dci.service';
import { InteractionSearch } from '../../services/interaction.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

import { AlldciService } from '../../services/alldci.service';

@Component({
  selector: 'app-interaction',
  templateUrl: './dci.component.html',
  styleUrls: ['./dci.component.scss'],
})
export class DciComponent implements OnInit {
  itemCollection: any;
  MyData: any;
  items: Observable<[any]>;
  inter: any;
  coffeeOrders: any;
  res: any;
  DciCollection: any;

  constructor(private dciSearch: DciSearch, private interactionSearch: InteractionSearch,
              private formBuilder: FormBuilder,
              private alldciService: AlldciService,
              private db: AngularFirestore) {
    this.reactiveForm = formBuilder.group({
      name: ['', Validators.required]
    });
  }
  Item;

  reactiveForm: FormGroup;
  public dci = [];
  public interaction = [];


  public keyword = 'ATCNM_F';
  public historyHeading = 'Recemment selectioné';
  interactionRef;
  dciRef;
  myResponse: any;
  FbmyResponse: any;
  code: any;

  form: FormGroup;
  event: any;
  dciToGet: any;

  getAllInteractions: any;
  save_outage_index() {
  }
  ngOnInit() {
    this.getDci();
  }

  getDci() {
    this.dciSearch.getDci().snapshotChanges().pipe(debounceTime(500),
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(dci => {
      this.dciRef = dci;
      this.dci = dci;
    });
  }


  // getInteraction() {
  //  this.interactionSearch.getInteraction().snapshotChanges().pipe(
  //    map(changes =>
  //      changes.map(c =>
  //        ({ key: c.payload.key, ...c.payload.val() })
  //      )
  //    )
  //  ).subscribe(interactions => {
  //    this.interactionRef = interactions;
  //    this.interaction = interactions;
  //  });

  //}
  // geInteractionList() {
  // this.interactionSearch.geInteractionList(this.code).snapshotChanges().pipe(
  //   map(changes =>
  //     changes.map(c =>
  //       ({ key: c.payload.key, ...c.payload.val() })
  //      )
  //    )
  //  ).subscribe(interactions => {
  //    this.interactionRef = interactions;
  //    this.interaction = interactions;
  //  });

  // }

  submitReactiveForm() {
    if (this.reactiveForm.valid) {
      this.dciToGet = this.reactiveForm.value;
      const code = this.dciToGet.name.ATCNM_F;
      this.itemCollection = this.db.collection<any[]>('CollMeds', ref => ref.where('DCI', '==',
        code));

      this.items = this.itemCollection.valueChanges().subscribe((val: any) => {
        this.inter = val;
         console.log(this.inter);
      }

      );
    }


  }
}

