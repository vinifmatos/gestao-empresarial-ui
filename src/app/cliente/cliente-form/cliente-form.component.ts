import { Component, OnInit } from '@angular/core';
import { Cliente } from "../cliente";
import { Router, ActivatedRoute } from "@angular/router";

import { ClienteService } from "../cliente.service";

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

      // this.clienteService.getCliente(id)
      //   .subscribe(cliente => this.cliente = new Cliente(
      //     cliente.id,
      //     cliente.nome,
      //     cliente.telefone,
      //     cliente.email,
      //     cliente.endereco_cliente
      //   ))
    })
  }

  onSubmit() {
    var result

    // if (this.cliente.id) {
    //   result = this.clienteService.updateCliente(this.cliente)
    // } else {
    //   result = this.clienteService.createCliente(this.cliente)
    // }
    result.subscribe(cliente => this.router.navigate(['/cliente/' + cliente.id]), erro => (this.errorHandle(erro)))
  }

  errorHandle(erro) {
    if (erro instanceof ErrorEvent) {
      console.log(erro.message)
    } else {
      if (erro.status == 422) {
        var els
        els = document.getElementsByClassName('invalid-feedback')
        Array.prototype.forEach.call(els, (e) => {
          e.innerHTML = ''
        })
        els = document.getElementsByClassName('is-invalid')
        Array.prototype.forEach.call(els, (e) => {
          e.classList.remove('is-invalid')
          e.classList.add('is-valid')
        })
        for (var prop in erro.error) {
          document.getElementById(`cliente_${prop.replace('.', '_')}`).classList.add('is-invalid')
          var el = document.getElementById(`cliente_${prop.replace('.', '_')}`).parentElement.getElementsByClassName('invalid-feedback')[0]
          el.append(`${erro.error[prop]}`)
        }
      } else {
        var msg = `Error code: ${erro.status}\nMessage: ${erro.message}`
        console.log(msg)
      }
    }
  }
}
