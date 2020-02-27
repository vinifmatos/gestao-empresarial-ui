import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from './api.service';
import { CustomDateAdapterService } from './custom-date-adapter.service';
import { CustomDateParserFormatterService } from './custom-date-parser-formatter.service';
import { RoundupPipe } from './roundup.pipe';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from '../app-routing.module';
import { NotificacaoService } from './notificacao/notificacao.service';
import { NotificacaoContainerComponent } from './notificacao/notificacao-container/notificacao-container.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';



@NgModule({
  declarations: [
    RoundupPipe,
    NotificacaoContainerComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
  ],
  providers: [
    ApiService,
    CustomDateAdapterService,
    CustomDateParserFormatterService,
    NotificacaoService
  ],
  exports: [
    RoundupPipe,
    NgbModule,
    FormsModule,
    AppRoutingModule,
    NotificacaoContainerComponent,
    FontAwesomeModule,
  ]
})
export class SharedModule { }
