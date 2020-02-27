import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProdutoIndexComponent } from './produto-index/produto-index.component';
import { ProdutoFormComponent } from './produto-form/produto-form.component';
import { ProdutoShowComponent } from './produto-show/produto-show.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    ProdutoIndexComponent,
    ProdutoFormComponent,
    ProdutoShowComponent,
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class ProdutoModule { }
