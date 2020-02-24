import { Component, OnInit } from '@angular/core';
import { ClienteService } from "../shared/cliente.service";
import { Router } from "@angular/router";
import { Cliente } from '../shared/cliente';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent implements OnInit {
  clientes: Cliente[] = []

  constructor(
    private clienteService: ClienteService,
    private router: Router) { }

  ngOnInit() {
    this.clienteService.getClientes().subscribe((data) => this.clientes = data)
  }

  rowClick(id) {
    this.router.navigate(['/cliente/' + id])
  }
}
