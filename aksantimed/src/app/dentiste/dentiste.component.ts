import { Component, OnInit } from '@angular/core';
import { DentalService } from './dental.service';
import { map } from 'rxjs/operators';
import { AuthService } from './../services/AuthService';
import { ConnectionService } from 'ng-connection-service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-dentiste',
  templateUrl: './dentiste.component.html',
  styleUrls: ['./dentiste.component.scss'],
})
export class DentisteComponent implements OnInit {
  interactions: any;
  userEmail: string;
  userName: string;
  startAt = new Subject();
  endAt = new Subject();
  status = '';
  isConnected = true;
  navCtrl: any;
  logged: any;
  medecin: any;
  name: any;

  subscribedParam: any;
  constructor(    public dentalService: DentalService,
                  public authService: AuthService,
                  private readonly route: ActivatedRoute,
                  private readonly router: Router,
                  public connectionService: ConnectionService) { }

  ngOnInit() {    
    // Subscribed
        this.route.paramMap.subscribe(params => {
        this.subscribedParam = params.get('categorie');
      });
    
    // tslint:disable-next-line: no-unused-expression
        this.userEmail;
    
    // tslint:disable-next-line: no-unused-expression
        this.medecin;
    
    // tslint:disable-next-line: no-unused-expression
        this.logged;
    
        this.connectionService.monitor().subscribe(isConnected => {
          this.isConnected = isConnected;
          if (this.isConnected) {
            this.status = 'Connecté à Internet';
            console.log( this.status);
          } else {
            this.status = 'Pas de connection Internet';
            console.log( this.status);
          }
        });
        if (this.authService.userDetails()) {
          this.userEmail = this.authService.userDetails().email;
          console.log(this.userEmail);
          this.logged = true;
          this.userName = this.authService.userDetails().displayName;
          console.log(this.userName);
        } else {
          this.logged = false;
        }

        this.dentalService.getNotification().snapshotChanges().pipe(
          map(changes =>
            changes.map(c =>
              ({ key: c.payload.key, ...c.payload.val() })
            )
          )
        ).subscribe(interactions => {
          this.interactions = interactions;
          console.log(interactions);
        });
      }
    }
