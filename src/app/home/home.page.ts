import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalCadastrarPage } from '../modal-cadastrar/modal-cadastrar.page';
import { ModalVisualizarPage } from '../modal-visualizar/modal-visualizar.page';
 
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
 
  dataReturned:any;
 
  constructor(
    public modalController: ModalController
  ) { }
 
  async openModalCadastrar() {
    const modalCadastrar = await this.modalController.create({
      component: ModalCadastrarPage,
      componentProps: {
        "paramID": 123,
        "paramTitle": "Test Title"
      }
    });
 
    modalCadastrar.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
        this.dataReturned = dataReturned.data;
      }
    });
 
    return await modalCadastrar.present();
  }

  async openModalVisualizar() {
    const modalVisualizar = await this.modalController.create({
      component: ModalVisualizarPage,
      componentProps: {
        "paramID": 123,
        "paramTitle": "Test Title"
      }
    });
 
    modalVisualizar.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
        this.dataReturned = dataReturned.data;
      }
    });
 
    return await modalVisualizar.present();
  }
}
 