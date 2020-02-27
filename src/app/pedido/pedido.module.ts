import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PedidoIndexComponent } from './pedido-index/pedido-index.component';
import { PedidoShowComponent } from './pedido-show/pedido-show.component';
import { PedidoFormComponent } from './pedido-form/pedido-form.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    PedidoIndexComponent,
    PedidoShowComponent,
    PedidoFormComponent,
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class PedidoModule { }
