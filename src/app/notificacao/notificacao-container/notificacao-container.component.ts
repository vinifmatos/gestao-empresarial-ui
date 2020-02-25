import { Component, TemplateRef } from '@angular/core';
import { NotificacaoService } from '../notificacao.service';

@Component({
  selector: 'app-notificacao-container',
  template: `
    <ngb-toast header="{{notificacao.cabecalho}}"
      *ngFor="let notificacao of notificacaoService.notificacoes"
      [class]="notificacao.classname"
      [autohide]="true"
      [delay]="notificacao.delay || 5000"
      (hide)="notificacaoService.remove(notificacao)"
    >
      <ng-template [ngIf]="isTemplate(notificacao)" [ngIfElse]="text">
        <ng-template [ngTemplateOutlet]="notificacao.textoOuTemplate"></ng-template>
      </ng-template>

      <ng-template #text>{{ notificacao.textoOuTemplate }}</ng-template>
    </ngb-toast>
  `,
  host: { '[class.ngb-toasts]': 'true' }
})
export class NotificacaoContainerComponent {
  constructor(public notificacaoService: NotificacaoService) { }

  isTemplate(notificacao) { return notificacao.textoOuTemplate instanceof TemplateRef; }
}
