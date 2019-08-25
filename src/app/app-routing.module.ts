import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  { path: 'modal-visualizar', loadChildren: './modal-visualizar/modal-visualizar.module#ModalVisualizarPageModule' },
  { path: 'modal-cadastrar', loadChildren: './modal-cadastrar/modal-cadastrar.module#ModalCadastrarPageModule' },
  { path: 'modal-editar', loadChildren: './modal-editar/modal-editar.module#ModalEditarPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
