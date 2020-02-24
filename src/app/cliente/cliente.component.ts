import { Component, OnInit } from '@angular/core';
import { ClienteService } from "./shared/cliente.service";
import { Cliente } from './shared/cliente';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.scss']
})
export class ClienteComponent implements OnInit {
  cliente: Cliente = new Cliente()

  constructor(
    private clienteService: ClienteService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.clienteService.getCliente(params['id']).subscribe(cliente => this.cliente = cliente)
    })
  }

  deleteCliente(cliente) {
    if (confirm("Apagar o cliente " + cliente.nome + "?")) {
      this.clienteService.deleteCliente(cliente.id).subscribe((null));
    }
  }
}
