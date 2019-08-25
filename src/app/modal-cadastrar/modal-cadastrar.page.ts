import { Component, OnInit, ViewChild } from '@angular/core';
import { StorageService, Estudante } from '../services/storage.service';
import { ModalController, NavParams, Platform, ToastController, IonList } from '@ionic/angular';


@Component({
  selector: 'app-modal-cadastrar',
  templateUrl: './modal-cadastrar.page.html',
  styleUrls: ['./modal-cadastrar.page.scss'],
})
export class ModalCadastrarPage implements OnInit {

  items: Estudante[] = [];
  
  novoEstudante: Estudante = <Estudante>{};

  modalTitle:string;
  modelId:number;

  @ViewChild('mylist', {static: false})mylist: IonList;
 
  constructor(private storageService: StorageService, private plt: Platform, private toastController: ToastController, private modalController: ModalController,
    private navParams: NavParams) {
    this.plt.ready().then(() => {
      this.loadItems();
    });

    
  }

  ngOnInit() {
    console.table(this.navParams);
    this.modelId = this.navParams.data.paramID;
    this.modalTitle = this.navParams.data.paramTitle;
  }

  async closeModal() {
    await this.modalController.dismiss();
  }
 
  // CREATE
  addItem() {

    if(this.novoEstudante.nome == 'as') {
      this.showToast('Item MISSING!')
    }
    else {
      this.novoEstudante.modified = Date.now();
      this.novoEstudante.id = Date.now();
  
      this.storageService.addItem(this.novoEstudante).then(item => {
        this.novoEstudante = <Estudante>{};
        this.showToast('Estudante Cadastrado!')
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
 
  // Helper
  async showToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

  public onKeyUp(event: any) {

    const NUMBER_REGEXP = /^\s*(\-|\+)?(\d+|(\d*(\.\d*)))([eE][+-]?\d+)?\s*$/;
    let newValue = event.target.value;
    let regExp = new RegExp(NUMBER_REGEXP);

    if (!regExp.test(newValue)) {
      event.target.value = newValue.slice(0, -1);
    }
  }
 
}

