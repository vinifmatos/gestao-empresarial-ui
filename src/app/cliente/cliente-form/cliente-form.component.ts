import { Component, OnInit } from '@angular/core';
import { Cliente } from "../shared/cliente";
import { Router, ActivatedRoute } from "@angular/router";

import { ClienteService } from "../shared/cliente.service";

@Component({
  selector: 'app-cliente-form',
  templateUrl: './cliente-form.component.html',
  styleUrls: ['./cliente-form.component.scss']
})
export class ClienteFormComponent implements OnInit {
  titulo: string
  cliente: Cliente = new Cliente()
  backRoute: string

  constructor(
    private clienteService: ClienteService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      var id = params['id']

      this.titulo = id ? 'Editar Cliente' : 'Novo Cliente'
      this.backRoute = id ? '/cliente/' + id : '/clientes'

      if (!id)
        return

      this.clienteService.getCliente(id)
        .subscribe(cliente => this.cliente = new Cliente(
          cliente.id,
          cliente.nome,
          cliente.telefone,
          cliente.email,
          cliente.endereco_cliente
        ))
    })
  }

  onSubmit() {
    var result

    if (this.cliente.id) {
      result = this.clienteService.updateCliente(this.cliente)
    } else {
      result = this.clienteService.createCliente(this.cliente)
    }

    result.subscribe(cliente => this.router.navigate(['/cliente/' + cliente.id]))
  }
}
