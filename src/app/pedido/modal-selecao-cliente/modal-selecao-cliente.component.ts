import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Cliente } from 'src/app/cliente/cliente';
import { ClienteService } from 'src/app/cliente/cliente.service';

@Component({
  selector: 'modal-selecao-cliente',
  templateUrl: './modal-selecao-cliente.component.html',
  styleUrls: ['./modal-selecao-cliente.component.scss']
})
export class ModalSelecaoClienteComponent implements OnInit {
  @Input() cliente_selecionado: Cliente;
  @Output() selecionado: EventEmitter<Cliente> = new EventEmitter<Cliente>();
  clientes: Cliente[];

  constructor(
    public activeModal: NgbActiveModal,
    private clienteService: ClienteService,
  ) { }

  ngOnInit(): void {
    this.clienteService.list().subscribe((resp: any) => this.clientes = resp.clientes)
  }

  onRowClick(linha: HTMLElement, cliente: Cliente) {
    let class_name = 'table-primary';
    linha.parentElement.querySelectorAll("tr").forEach((e) => e.classList.remove(class_name))
    linha.classList.add(class_name)
    this.cliente_selecionado = cliente
    this.selecionado.emit(this.cliente_selecionado)
  }
}
