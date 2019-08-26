import { Component, OnInit, ViewChild } from '@angular/core';
import { StorageService, Estudante } from '../services/storage.service';
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
 
  constructor(private storageService: StorageService, private plt: Platform, private toastController: ToastController, private modalController: ModalController,
    private navParams: NavParams) {
    this.plt.ready().then(() => {
      this.loadItems();
    });
  }

  async closeModal() {
    await this.modalController.dismiss();
  }
 
  
  // READ
  loadItems() {
    this.storageService.getItems().then(items => {
      this.items = items;
    });
  }
 
  
  // Helper
  async showToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

  // DELETE
  deleteItem(item: Estudante) {
    this.storageService.deleteItem(item.id).then(item => {
      this.showToast('Estudante removido com sucesso!');
      this.listaEstudantes.closeSlidingItems();
      this.loadItems();
    });
  }


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