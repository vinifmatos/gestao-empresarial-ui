import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Cliente } from 'src/app/cliente/cliente';
import { ClienteService } from 'src/app/cliente/cliente.service';
import { fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'modal-selecao-cliente',
  templateUrl: './modal-selecao-cliente.component.html',
  styleUrls: ['./modal-selecao-cliente.component.scss']
})
export class ModalSelecaoClienteComponent implements OnInit, AfterViewInit {
  @Input() cliente_selecionado: Cliente;
  @Output() selecionado: EventEmitter<Cliente> = new EventEmitter<Cliente>();
  clientes: Cliente[];
  @ViewChild('busca') busca: ElementRef;

  constructor(
    public activeModal: NgbActiveModal,
    private clienteService: ClienteService,
  ) { }

  ngOnInit(): void {
    this.clienteService.list_por_nome('').subscribe((resp: any) => this.clientes = resp.clientes)
  }

  ngAfterViewInit(): void {
    fromEvent(this.busca.nativeElement, 'keyup').pipe(debounceTime(250)).subscribe((event: any) => {
      let input: HTMLInputElement = event.target
      this.clienteService.list_por_nome(input.value).subscribe((resp: any) => this.clientes = resp.clientes)
    })
  }

  onRowClick(linha: HTMLElement, cliente: Cliente) {
    let class_name = 'table-primary';
    linha.parentElement.querySelectorAll("tr").forEach((e) => e.classList.remove(class_name))
    linha.classList.add(class_name)
    this.cliente_selecionado = cliente
    this.selecionado.emit(this.cliente_selecionado)
  }
}
