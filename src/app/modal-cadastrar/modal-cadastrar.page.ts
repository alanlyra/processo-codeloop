import { Component, OnInit, ViewChild } from '@angular/core';
import { StorageService, Estudante, GlobalFunctions } from '../services/storage.service';
import { ModalController, NavParams, Platform, ToastController, IonList } from '@ionic/angular';
import { AppComponent } from '../app.component';


@Component({
  selector: 'app-modal-cadastrar',
  templateUrl: './modal-cadastrar.page.html',
  styleUrls: ['./modal-cadastrar.page.scss'],
})
export class ModalCadastrarPage implements OnInit {

  items: Estudante[] = [];
  
  novoEstudante: Estudante = <Estudante>{};

  @ViewChild('listaEstudantes', {static: false})listaEstudantes: IonList;
 
  constructor(private globalFunctions: GlobalFunctions, private storageService: StorageService, private plt: Platform, private toastController: ToastController, private modalController: ModalController,
    private navParams: NavParams) {
    this.plt.ready().then(() => {
      this.loadItems();
    });
  }

  ngOnInit() {
 
  }

  async closeModal() {
    await this.modalController.dismiss();
  }
 
  // CREATE
  addItem() {
    if(this.globalFunctions.validarDados(this.novoEstudante)) {
      this.novoEstudante.modified = Date.now();
      this.novoEstudante.id = Date.now();
  
      this.storageService.addItem(this.novoEstudante).then(item => {
        this.novoEstudante = <Estudante>{};
        this.globalFunctions.showToast('Estudante Cadastrado!')
        this.loadItems();
        this.closeModal();
      });
    }
  }
 
  // READ
  loadItems() {
    this.storageService.getItems().then(items => {
      this.items = items;
    });
  }
  
  //PERMISSÃO PARA DIGITAR APENAS NÚMEROS
  onKeyUp(event: any) {
    const NUMBER_REGEXP = /^\s*(\-|\+)?(\d+|(\d*(\.\d*)))([eE][+-]?\d+)?\s*$/;
    let newValue = event.target.value;
    let regExp = new RegExp(NUMBER_REGEXP);

    if (!regExp.test(newValue)) {
      event.target.value = newValue.slice(0, -1);
    }
  }
 
}

