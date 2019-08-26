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

  constructor(
    public modalController: ModalController
  ) { }
 
  //FUNÇÃO PARA ABRIR MODAL DE CADASTRO
  async openModalCadastrar() {
    const modalCadastrar = await this.modalController.create({
      component: ModalCadastrarPage,
      componentProps: {     
      }
    });
 
    return await modalCadastrar.present();
  }

  //FUNÇÃO PARA ABRIR MODAL DE VISUALIZAR ESTUDANTES
  async openModalVisualizar() {
    const modalVisualizar = await this.modalController.create({
      component: ModalVisualizarPage,
      componentProps: {   
      }
    });
  
    return await modalVisualizar.present();
  }
}
 