import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TesteComponent } from './teste.component';



@NgModule({
  declarations: [TesteComponent],
  imports: [
    CommonModule
  ],
  exports: [TesteComponent]
})
export class TesteModule { }
