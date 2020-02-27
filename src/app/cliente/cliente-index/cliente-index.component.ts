import { Component, OnInit } from '@angular/core';
import { ClienteService } from "../cliente.service";
import { Router } from "@angular/router";
import { Cliente } from '../cliente';

@Component({
  selector: 'app-clientes',
  templateUrl: './cliente-index.component.html',
  styleUrls: ['./cliente-index.component.scss']
})

export class ClienteIndexComponent implements OnInit {
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
    this.setClientes(this.current_page)
  }

  rowClick(id) {
    this.router.navigate(['/cliente/' + id])
  }

  onPageChange(page) {
    this.current_page = page
    this.setClientes(page)
  }

  setClientes(page) {
    this.clienteService.list(page, this.record_per_page).subscribe((resp: any) => {
      this.clientes = resp.clientes
      this.total_records = resp.total_records
      this.total_pages = parseInt((this.total_records / this.record_per_page).toFixed(0))
    })
  }

  onPerPageChange(per_page) {
    this.record_per_page = per_page
    this.onPageChange(1)
  }
}
