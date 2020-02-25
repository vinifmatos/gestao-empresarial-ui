import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ClientesComponent } from './cliente/clientes/clientes.component';
import { ClienteComponent } from './cliente/cliente.component';
import { ClienteFormComponent } from './cliente/cliente-form/cliente-form.component';
import { ProdutoIndexComponent } from "./produto/produto-index/produto-index.component";
import { ProdutoShowComponent } from "./produto/produto-show/produto-show.component";
import { ProdutoFormComponent } from "./produto/produto-form/produto-form.component";


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'clientes', component: ClientesComponent },
  { path: 'cliente/:id', component: ClienteComponent },
  { path: 'clientes/new', component: ClienteFormComponent },
  { path: 'cliente/edit/:id', component: ClienteFormComponent },

  { path: 'produtos', component: ProdutoIndexComponent },
  { path: 'produto/:id', component: ProdutoShowComponent },
  { path: 'produtos/new', component: ProdutoFormComponent },
  { path: 'produto/edit/:id', component: ProdutoFormComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
