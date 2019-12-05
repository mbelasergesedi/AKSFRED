import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalPagePage } from './modal-page/modal-page.page';
import { AuthService } from './../services/AuthService';
import { ConnectionService } from 'ng-connection-service';

@Component({
  selector: 'app-tab3',
  templateUrl: './tab3.page.html',
  styleUrls: ['./tab3.page.scss'],
})
export class Tab3Page implements OnInit {
  dataFromModal;
  interactions: any;
  userEmail: string;
  userName: string;

  status = '';
  isConnected = true;
  navCtrl: any;
  logged: any;
  constructor(private modalController: ModalController,
              public authService: AuthService,
              public connectionService: ConnectionService) { }

  ngOnInit() {
    // tslint:disable-next-line: no-unused-expression
    this.userEmail;
    // tslint:disable-next-line: no-unused-expression
    this.logged;

    this.connectionService.monitor().subscribe(isConnected => {
      this.isConnected = isConnected;
      if (this.isConnected) {
        this.status = 'Connecté à Internet';
        console.log(this.status);
      } else {
        this.status = 'Pas de connection Internet';
        console.log(this.status);
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
  }
}
