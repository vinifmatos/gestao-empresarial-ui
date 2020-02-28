import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PedidoIndexComponent } from './pedido-index/pedido-index.component';
import { PedidoShowComponent } from './pedido-show/pedido-show.component';
import { PedidoFormComponent } from './pedido-form/pedido-form.component';
import { SharedModule } from '../shared/shared.module';
import { ModalSelecaoClienteComponent } from './modal-selecao-cliente/modal-selecao-cliente.component';
import { SelecaoProdutoComponent } from './selecao-produto/selecao-produto.component';



@NgModule({
  declarations: [
    PedidoIndexComponent,
    PedidoShowComponent,
    PedidoFormComponent,
    ModalSelecaoClienteComponent,
    SelecaoProdutoComponent,
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  entryComponents: [ModalSelecaoClienteComponent, SelecaoProdutoComponent]
})
export class PedidoModule { }
