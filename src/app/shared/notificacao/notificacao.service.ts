import { Injectable, TemplateRef } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificacaoService {
  notificacoes: any[] = []

  constructor() { }

  show(textoOuTemplate: string | TemplateRef<any>, cabecalho: string, options: any = {}) {
    this.notificacoes.push({ textoOuTemplate, cabecalho, ...options })
  }

  remove(notificacao) {
    this.notificacoes = this.notificacoes.filter(n => n != notificacao)
  }
}
