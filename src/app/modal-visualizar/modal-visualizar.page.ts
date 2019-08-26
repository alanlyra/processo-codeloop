import { Component, OnInit, ViewChild } from '@angular/core';
import { StorageService, Estudante, GlobalFunctions } from '../services/storage.service';
import { ModalController, NavParams, Platform, ToastController, IonList } from '@ionic/angular';
import { ModalEditarPage } from '../modal-editar/modal-editar.page';

@Component({
  selector: 'app-modal-visualizar',
  templateUrl: './modal-visualizar.page.html',
  styleUrls: ['./modal-visualizar.page.scss'],
})
export class ModalVisualizarPage {

  items: Estudante[] = [];
  novoEstudante: Estudante = <Estudante>{};
  dataReturned:any;
 
  @ViewChild('listaEstudantes', {static: false})listaEstudantes: IonList;
 
  constructor(private globalFunctions: GlobalFunctions, private storageService: StorageService, private plt: Platform, private toastController: ToastController, private modalController: ModalController,
    private navParams: NavParams) {
    this.plt.ready().then(() => {
      this.loadItems();
    });
  }

  //FUNÇÃO PARA FECHAR O MODAL DE VISUALIZAR ESTUDANTES
  async closeModal() {
    await this.modalController.dismiss();
  }
 
  //CARREGA OS DADOS DOS ESTUDANTES
  loadItems() {
    this.storageService.getItems().then(items => {
      this.items = items;
    });
  }

  //REMOVER ESTUDANTE
  deleteItem(item: Estudante) {
    this.storageService.deleteItem(item.id).then(item => {
      this.globalFunctions.showToast('Estudante removido com sucesso!');
      this.listaEstudantes.closeSlidingItems();
      this.loadItems();
    });
  }

  //ABRE O MODAL DE EDIÇÃO
  async openModalEditar(item: Estudante) {
    const modalEditar = await this.modalController.create({
      component: ModalEditarPage,
      componentProps: {
        "estudante": item
      }
    });
 
    modalEditar.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
        this.dataReturned = dataReturned.data;
      }
    });
 
    return await modalEditar.present();
  }
 
}