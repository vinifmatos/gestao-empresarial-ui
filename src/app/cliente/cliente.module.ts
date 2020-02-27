import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClienteShowComponent } from './cliente-show/cliente-show.component';
import { ClienteIndexComponent } from './cliente-index/cliente-index.component';
import { ClienteFormComponent } from './cliente-form/cliente-form.component';
import { SharedModule } from '../shared/shared.module';
import { ClienteService } from './cliente.service';



@NgModule({
  declarations: [
    ClienteShowComponent,
    ClienteIndexComponent,
    ClienteFormComponent,
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  providers: [
    ClienteService,
  ]
})
export class ClienteModule { }
