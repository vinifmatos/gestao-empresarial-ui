import { Component, OnInit } from '@angular/core';
import { Pedido } from '../pedido';
import { Router } from '@angular/router';
import { PedidoService } from '../pedido.service';

@Component({
  selector: 'app-pedido-index',
  templateUrl: './pedido-index.component.html',
  styleUrls: ['./pedido-index.component.scss']
})
export class PedidoIndexComponent implements OnInit {
  pedidos: Pedido[] = []
  current_page: number = 1
  total_pages: number = 0
  total_records: number = 0
  record_per_page: number = 25
  max_pages: number = 7

  constructor(
    private router: Router,
    private pedidoService: PedidoService,
  ) {
  }

  ngOnInit() {
    this.setClients(this.current_page)
  }

  rowClick(id) {
    this.router.navigate(['/pedido/', id])
  }

  onPageChange(page) {
    this.current_page = page
    this.setClients(page)
  }

  setClients(page) {
    this.pedidoService.list(page, this.record_per_page).subscribe((resp: any) => {
      this.pedidos = resp.pedidos
      this.total_records = resp.total_records
      this.total_pages = parseInt((this.total_records / this.record_per_page).toFixed(0))
    })
  }

  onPerPageChange(per_page) {
    this.record_per_page = per_page
    this.onPageChange(1)
  }
}
