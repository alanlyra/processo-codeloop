import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ModalCadastrarPage } from './modal-cadastrar.page';

const routes: Routes = [
  {
    path: '',
    component: ModalCadastrarPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ModalCadastrarPage]
})
export class ModalCadastrarPageModule {}
