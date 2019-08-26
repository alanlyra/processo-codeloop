import { Component, OnInit, ViewChild } from '@angular/core';
import { StorageService, Estudante, GlobalFunctions } from '../services/storage.service';
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
 
  @ViewChild('listaEstudantes', {static: false})listaEstudantes: IonList;
 
  constructor(private globalFunctions: GlobalFunctions, private storageService: StorageService, private plt: Platform, private toastController: ToastController, private modalController: ModalController,
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
    if(this.dadosEstudante.nome)
      this.estudanteEditar.nome = this.dadosEstudante.nome;
    if(this.dadosEstudante.dataNasc)
      this.estudanteEditar.dataNasc = this.dadosEstudante.dataNasc;
    if(this.dadosEstudante.serie)
      this.estudanteEditar.serie = this.dadosEstudante.serie;
    if(this.dadosEstudante.cep)
      if(!this.globalFunctions.validarCEP(this.dadosEstudante.cep.toString())){ 
        this.globalFunctions.showToast("CEP Inválido!");
        return;
      }
      else
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
      if(!this.globalFunctions.validarCPF(this.dadosEstudante.cpfMae.toString())) {
        this.globalFunctions.showToast("CPF Inválido!");
        return;
      }
      else
        this.estudanteEditar.cpfMae = this.dadosEstudante.cpfMae;
    if(this.dadosEstudante.dataPgto)
      this.estudanteEditar.dataPgto = this.dadosEstudante.dataPgto;
    this.estudanteEditar.modified = Date.now();
 
    this.storageService.updateItem(this.estudanteEditar).then(item => {
      this.globalFunctions.showToast('Estudante editado com sucesso!');
      this.loadItems(); 
      this.closeModal();
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