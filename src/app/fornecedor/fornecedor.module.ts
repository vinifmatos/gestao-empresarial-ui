import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FornecedorIndexComponent } from './fornecedor-index/fornecedor-index.component';
import { FornecedorFormComponent } from './fornecedor-form/fornecedor-form.component';
import { FornecedorShowComponent } from './fornecedor-show/fornecedor-show.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    FornecedorIndexComponent,
    FornecedorFormComponent,
    FornecedorShowComponent,
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class FornecedorModule { }
