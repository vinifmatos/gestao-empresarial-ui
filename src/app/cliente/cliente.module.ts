import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClienteComponent } from './cliente.component';
import { ClientesComponent } from './clientes/clientes.component';
import { ClienteFormComponent } from './cliente-form/cliente-form.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    ClienteComponent,
    ClientesComponent,
    ClienteFormComponent,
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class ClienteModule { }
