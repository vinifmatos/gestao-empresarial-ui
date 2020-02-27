import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from './api.service';
import { Form } from './form';
import { CustomDateAdapterService } from './custom-date-adapter.service';
import { CustomDateParserFormatterService } from './custom-date-parser-formatter.service';
import { RoundupPipe } from './roundup.pipe';



@NgModule({
  declarations: [
    RoundupPipe,
  ],
  imports: [
    CommonModule
  ],
  providers: [
    ApiService,
    Form,
    CustomDateAdapterService,
    CustomDateParserFormatterService,
  ],
  exports: [
    RoundupPipe
  ]
})
export class SharedModule { }
