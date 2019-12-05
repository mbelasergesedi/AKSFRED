import { Component, OnInit } from '@angular/core';
import { NotificationsService } from './notification.service';
import { QryStatNotifs } from './statnotif.service';
import { map } from 'rxjs/operators';
import { AuthService } from './../services/AuthService';
import { ConnectionService } from 'ng-connection-service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-tab1',
  templateUrl: './tab1.page.html',
  styleUrls: ['./tab1.page.scss']
})
export class Tab1Page implements OnInit {
  // Nouvelles
  ObjNouvelles = {
    categorie: 'Nouvelles',
    maxdata: 10
  };

  // Alertes
  ObjAlertes = {
    categorie: 'Alertes',
    maxdata: 10
  };

  // Ordre des pharmaciens
  ObjOpharmaciens = {
    categorie: 'Opharmaciens',
    maxdata: 10
  };

  // Fermeture pharmacie
  ObjClosePharma = {
    categorie: 'closePharma',
    maxdata: 10
  };

  //   Retrait produit
  ObjRetiredPharma = {
    categorie: 'RetiredPharma',
    maxdata: 10
  };

  //   Ordre des médecins
  ObjOrdMedecins = {
    categorie: 'Omedecins',
    maxdata: 10
  };

  //   Ordre des dentistes
  ObjOrdDentistes = {
    categorie: 'ODentistes',
    maxdata: 10
  };

  //   Ordre des Kine
  ObjOrdKine = {
    categorie: 'OKine',
    maxdata: 10
  };
  //   Ordre tradi
  ObjOrdTradi = {
    categorie: 'OTradi',
    maxdata: 10
  };
  //   Ordre infis
  ObjOrdInfis = {
    categorie: 'OInfis',
    maxdata: 10
  };

  status = 'ONLINE';
  isConnected = true;

  interactions: any;
  stat: any;
  userEmail: string;
  userName: string;
  startAt = new Subject();
  endAt = new Subject();

  navCtrl: any;
  logged: any;
  medecin: any;
  name: any;

  subscribedParam: any;

  constructor(
    public notificationService: NotificationsService,
    public authService: AuthService,
    private qryStatNotifs: QryStatNotifs,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    public connectionService: ConnectionService
  ) {
    this.connectionService.monitor().subscribe(isConnected => {
      this.isConnected = isConnected;
      if (this.isConnected) {
        this.status = 'ONLINE';
      } else {
        this.status = 'OFFLINE';
      }
    });
  }

  ngOnInit() {
    // Subscribed
    this.route.paramMap.subscribe(params => {
      this.subscribedParam = params.get('categorie');
    });

    // tslint:disable-next-line: no-unused-expression
    this.userEmail;

    this.medecin;

    this.logged;
    if (this.authService.userDetails()) {
      this.userEmail = this.authService.userDetails().email;

      this.logged = true;
      this.userName = this.authService.userDetails().displayName;
    } else {
      this.logged = false;
    }
    // Notifications Service
    this.notificationService
      .getNotification()
      .snapshotChanges()
      .pipe(
        map(changes =>
          changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
        )
      )
      .subscribe(interactions => {
        this.interactions = interactions;
      });
  }
}
