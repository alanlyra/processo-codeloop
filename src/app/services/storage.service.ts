import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { compileComponentFromMetadata } from '@angular/compiler';
import {ToastController} from '@ionic/angular';

export class Estudante {
  id: number;
  nome: string;
  dataNasc: Date;
  serie: string;
  cep: number;
  rua: string;
  numero: number;
  complemento: string;
  bairro: string;
  cidade: string;
  estado: string;
  nomeMae: string;
  cpfMae: number;
  dataPgto: Date;
  modified: number;

}

const ITEMS_KEY = 'my-items';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private storage: Storage) { }

  // CREATE
  addItem(item: Estudante): Promise<any> {
    return this.storage.get(ITEMS_KEY).then((items: Estudante[]) => {
      if (items) {
        items.push(item);
        return this.storage.set(ITEMS_KEY, items);
      } else {
        return this.storage.set(ITEMS_KEY, [item]);
      }
    });
  }

  // READ
  getItems(): Promise<Estudante[]> {
    return this.storage.get(ITEMS_KEY);
  }

  // UPDATE
  updateItem(item: Estudante): Promise<any> {
    return this.storage.get(ITEMS_KEY).then((items: Estudante[]) => {
      if (!items || items.length === 0) {
        return null;
      }

      let novoEstudantes: Estudante[] = [];

      for (let i of items) {
        if (i.id === item.id) {
          novoEstudantes.push(item);
        } else {
          novoEstudantes.push(i);
        }
      }

      return this.storage.set(ITEMS_KEY, novoEstudantes);
    });
  }

  // DELETE
  deleteItem(id: number): Promise<Estudante> {
    return this.storage.get(ITEMS_KEY).then((items: Estudante[]) => {
      if (!items || items.length === 0) {
        return null;
      }

      let toKeep: Estudante[] = [];

      for (let i of items) {
        if (i.id !== id) {
          toKeep.push(i);
        }
      }
      return this.storage.set(ITEMS_KEY, toKeep);
    });
  }
}

@Injectable({
  providedIn: 'root'
})
export class GlobalFunctions {

  constructor(private globalFunctions: GlobalFunctions, private toastController: ToastController) { }

  //VALIDAÇÃO DE DADOS DE CADASTRO
  validarDados(estudante: Estudante): boolean {
    
    if(!estudante.nome || 
      !estudante.dataNasc || 
      !estudante.serie || 
      !estudante.cep || 
      !estudante.rua ||
      !estudante.numero ||
      !estudante.complemento ||
      !estudante.bairro ||
      !estudante.cidade ||
      !estudante.estado ||
      !estudante.nomeMae ||
      !estudante.cpfMae ||
      !estudante.dataPgto) {
      this.showToast("Preencha Todos os Dados!");
      return false;
    } 
    if(!this.validarCEP(estudante.cep.toString())) {
      this.showToast("CEP Inválido!");
      return false;
    } 
    if(!this.validarCPF(estudante.cpfMae.toString())) {
      this.showToast('CPF Inválido!');
      return false;
    }
    return true;
  }

  // VALIDAÇÃO DE CPF
  validarCPF(cpf: string): boolean {
    if (cpf == null) {
        return false;
    }
    if (cpf.length != 11) {
        return false;
    }
    if ((cpf == '00000000000') || (cpf == '11111111111') || (cpf == '22222222222') || (cpf == '33333333333') || (cpf == '44444444444') || (cpf == '55555555555') || (cpf == '66666666666') || (cpf == '77777777777') || (cpf == '88888888888') || (cpf == '99999999999')) {
        return false;
    }
    let numero: number = 0;
    let caracter: string = '';
    let numeros: string = '0123456789';
    let j: number = 10;
    let somatorio: number = 0;
    let resto: number = 0;
    let digito1: number = 0;
    let digito2: number = 0;
    let cpfAux: string = '';
    cpfAux = cpf.substring(0, 9);
    for (let i: number = 0; i < 9; i++) {
        caracter = cpfAux.charAt(i);
        if (numeros.search(caracter) == -1) {
            return false;
        }
        numero = Number(caracter);
        somatorio = somatorio + (numero * j);
        j--;
    }
    resto = somatorio % 11;
    digito1 = 11 - resto;
    if (digito1 > 9) {
        digito1 = 0;
    }
    j = 11;
    somatorio = 0;
    cpfAux = cpfAux + digito1;
    for (let i: number = 0; i < 10; i++) {
        caracter = cpfAux.charAt(i);
        numero = Number(caracter);
        somatorio = somatorio + (numero * j);
        j--;
    }
    resto = somatorio % 11;
    digito2 = 11 - resto;
    if (digito2 > 9) {
        digito2 = 0;
    }
    cpfAux = cpfAux + digito2;
    if (cpf != cpfAux) {
        return false;
    }
    else {
        return true;
    }
  } 

  //VALIDAÇÃO DE CEP
  validarCEP(cep: string): boolean {
    if (cep == null) {
        return false;
    }
    if (cep.length != 8) {
        return false;
    }
    if ((cep == '00000000') || (cep == '11111111') || (cep == '22222222') || (cep == '33333333') || (cep == '44444444') || (cep == '55555555') || (cep == '66666666') || (cep == '77777777') || (cep == '88888888') || (cep == '99999999')) {
        return false;
    }
    else {
      return true;
    }
  } 

  //MENSAGEM NA TELA
  async showToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

}