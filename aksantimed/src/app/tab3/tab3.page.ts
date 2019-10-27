import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { ModalPagePage } from './modal-page/modal-page.page';
@Component({
  selector: 'app-tab3',
  templateUrl: './tab3.page.html',
  styleUrls: ['./tab3.page.scss'],
})
export class Tab3Page implements OnInit {
  dataFromModal;

  constructor(private modalController: ModalController) {}

  ngOnInit() { }

  async settings() {
    const modal = await this.modalController.create({
      component: ModalPagePage,
      componentProps: { website: 'edupala.com' },
      backdropDismiss: false,
    });

    modal.present();
    this.dataFromModal = await modal.onWillDismiss();
  }

}
