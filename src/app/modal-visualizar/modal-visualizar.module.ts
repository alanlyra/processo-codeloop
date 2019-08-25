import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ModalVisualizarPage } from './modal-visualizar.page';

const routes: Routes = [
  {
    path: '',
    component: ModalVisualizarPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ModalVisualizarPage]
})
export class ModalVisualizarPageModule {}
