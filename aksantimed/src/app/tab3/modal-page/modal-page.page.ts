import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
@Component({
  selector: 'app-modal-page',
  templateUrl: './modal-page.page.html',
  styleUrls: ['./modal-page.page.scss'],
})

export class ModalPagePage implements OnInit {
  website: string;
  constructor(private modalController: ModalController) { }

  ngOnInit() {
  }

  settingIonic(version: string) {
    this.modalController.dismiss({
      ionic: version
    });
  }

  settingAngular(version: string) {

  }

  settingJavascript() {}

  closeModal() { this.modalController.dismiss(); }

}