import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ClienteIndexComponent } from './cliente/cliente-index/cliente-index.component';
import { ClienteShowComponent } from './cliente/cliente-show/cliente-show.component';
import { ClienteFormComponent } from './cliente/cliente-form/cliente-form.component';
import { ProdutoIndexComponent } from "./produto/produto-index/produto-index.component";
import { ProdutoShowComponent } from "./produto/produto-show/produto-show.component";
import { ProdutoFormComponent } from "./produto/produto-form/produto-form.component";
import { FornecedorIndexComponent } from "./fornecedor/fornecedor-index/fornecedor-index.component";
import { FornecedorShowComponent } from "./fornecedor/fornecedor-show/fornecedor-show.component";
import { FornecedorFormComponent } from "./fornecedor/fornecedor-form/fornecedor-form.component";
import { PedidoIndexComponent } from "./pedido/pedido-index/pedido-index.component";
import { PedidoFormComponent } from "./pedido/pedido-form/pedido-form.component";
import { PedidoShowComponent } from "./pedido/pedido-show/pedido-show.component";

const routes: Routes = [
  { path: '', pathMatch: 'full', component: HomeComponent },

  { path: 'clientes', pathMatch: 'full', component: ClienteIndexComponent },
  { path: 'cliente/:id', pathMatch: 'full', component: ClienteShowComponent },
  { path: 'clientes/new', pathMatch: 'full', component: ClienteFormComponent },
  { path: 'cliente/:id/edit', pathMatch: 'full', component: ClienteFormComponent },

  { path: 'produtos', pathMatch: 'full', component: ProdutoIndexComponent },
  { path: 'produto/:id', pathMatch: 'full', component: ProdutoShowComponent },
  { path: 'produtos/new', pathMatch: 'full', component: ProdutoFormComponent },
  { path: 'produto/:id/edit', pathMatch: 'full', component: ProdutoFormComponent },

  { path: 'fornecedores', pathMatch: 'full', component: FornecedorIndexComponent },
  { path: 'fornecedor/:id', pathMatch: 'full', component: FornecedorShowComponent },
  { path: 'fornecedores/new', pathMatch: 'full', component: FornecedorFormComponent },
  { path: 'fornecedor/:id/edit', pathMatch: 'full', component: FornecedorFormComponent },

  { path: 'pedidos', pathMatch: 'full', component: PedidoIndexComponent },
  { path: 'pedido/:id', pathMatch: 'full', component: PedidoShowComponent },
  { path: 'pedidos/new', pathMatch: 'full', component: PedidoFormComponent },
  { path: 'pedido/:id/edit', pathMatch: 'full', component: PedidoFormComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
