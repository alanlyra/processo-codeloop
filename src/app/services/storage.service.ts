import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { compileComponentFromMetadata } from '@angular/compiler';

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

  getNome(): string {
    return this.nome;
  }

  setNome(nome: string) {
    this.nome = nome;
  }
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