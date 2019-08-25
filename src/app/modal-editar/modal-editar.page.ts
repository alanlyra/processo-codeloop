import { Component, OnInit, ViewChild } from '@angular/core';
import { StorageService, Estudante } from '../services/storage.service';
import { ModalController, NavParams, Platform, ToastController, IonList } from '@ionic/angular';

@Component({
  selector: 'app-modal-editar',
  templateUrl: './modal-editar.page.html',
  styleUrls: ['./modal-editar.page.scss'],
})
export class ModalEditarPage implements OnInit {

  items: Estudante[] = [];
 
  dadosEstudante: Estudante = <Estudante>{};

  estudanteEditar: Estudante = <Estudante>{};
 
  @ViewChild('mylist', {static: false})mylist: IonList;
 
  constructor(private storageService: StorageService, private plt: Platform, private toastController: ToastController, private modalController: ModalController,
    private navParams: NavParams) {
    this.plt.ready().then(() => {
      this.loadItems();
    });
  }

  ngOnInit() {
    console.table(this.navParams);
    this.estudanteEditar = this.navParams.data.estudante;
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
 
  // UPDATE
  updateItem() {
    //console.log(this.estudanteEditar.nome);
    
    if(this.dadosEstudante.nome)
      this.estudanteEditar.nome = this.dadosEstudante.nome;
    if(this.dadosEstudante.dataNasc)
      this.estudanteEditar.dataNasc = this.dadosEstudante.dataNasc;
    if(this.dadosEstudante.serie)
      this.estudanteEditar.serie = this.dadosEstudante.serie;
    if(this.dadosEstudante.cep)
      this.estudanteEditar.cep = this.dadosEstudante.cep;
    if(this.dadosEstudante.rua)
      this.estudanteEditar.rua = this.dadosEstudante.rua;
    if(this.dadosEstudante.numero)
      this.estudanteEditar.numero = this.dadosEstudante.numero;
    if(this.dadosEstudante.complemento)
      this.estudanteEditar.complemento = this.dadosEstudante.complemento;
    if(this.dadosEstudante.bairro)
      this.estudanteEditar.bairro = this.dadosEstudante.bairro;
    if(this.dadosEstudante.cidade)
      this.estudanteEditar.cidade = this.dadosEstudante.cidade;
    if(this.dadosEstudante.estado)
      this.estudanteEditar.estado = this.dadosEstudante.estado;
    if(this.dadosEstudante.nomeMae)
      this.estudanteEditar.nomeMae = this.dadosEstudante.nomeMae;
    if(this.dadosEstudante.cpfMae)
      this.estudanteEditar.cpfMae = this.dadosEstudante.cpfMae;
    if(this.dadosEstudante.dataPgto)
      this.estudanteEditar.dataPgto = this.dadosEstudante.dataPgto;
    this.estudanteEditar.modified = Date.now();
 
    this.storageService.updateItem(this.estudanteEditar).then(item => {
      this.showToast('Estudante editado!');
      this.loadItems(); 
      this.closeModal();
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