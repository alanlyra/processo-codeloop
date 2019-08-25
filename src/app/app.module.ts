import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
 
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
 
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ModalCadastrarPageModule } from './modal-cadastrar/modal-cadastrar.module';
import { ModalVisualizarPageModule } from './modal-visualizar/modal-visualizar.module';
import { ModalEditarPageModule } from './modal-editar/modal-editar.module';
  
import { IonicStorageModule } from '@ionic/storage';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [
  ],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    ModalCadastrarPageModule,
    ModalVisualizarPageModule,
    ModalEditarPageModule,
    IonicStorageModule.forRoot()
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}