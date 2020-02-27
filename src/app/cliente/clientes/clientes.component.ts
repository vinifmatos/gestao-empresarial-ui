import { Component, OnInit } from '@angular/core';
import { ClienteService } from "../cliente.service";
import { Router } from "@angular/router";
import { Cliente } from '../cliente';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})

export class ClientesComponent implements OnInit {
  clientes: Cliente[] = []
  current_page: number = 1
  total_pages: number = 0
  total_records: number = 0
  record_per_page: number = 25
  max_pages: number = 7

  constructor(
    private clienteService: ClienteService,
    private router: Router, ) {
  }

  ngOnInit() {
    this.setClients(this.current_page)
  }

  rowClick(id) {
    this.router.navigate(['/cliente/' + id])
  }

  onPageChange(page) {
    this.current_page = page
    this.setClients(page)
  }

  setClients(page) {
    // this.clienteService.getClientes(page, this.record_per_page).subscribe((resp) => {
    //   this.clientes = resp.body
    //   this.total_records = parseInt(resp.headers.get('Total'))
    //   this.total_pages = parseInt((this.total_records / this.record_per_page).toFixed(0))
    // })
  }

  onPerPageChange(per_page) {
    this.record_per_page = per_page
    this.onPageChange(1)
  }
}
