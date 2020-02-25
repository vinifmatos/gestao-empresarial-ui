import { Component, OnInit } from '@angular/core';
import { Fornecedor } from "../fornecedor";
import { Router } from "@angular/router";
import { ApiService } from "../../shared/api.service";

@Component({
  selector: 'app-fornecedor-index',
  templateUrl: './fornecedor-index.component.html',
  styleUrls: ['./fornecedor-index.component.scss']
})
export class FornecedorIndexComponent implements OnInit {
  fornecedores: Fornecedor[] = []
  current_page: number = 1
  total_pages: number = 0
  total_records: number = 0
  record_per_page: number = 25
  max_pages: number = 7

  constructor(
    private router: Router,
    private apiService: ApiService,
  ) {
  }

  ngOnInit() {
    this.setClients(this.current_page)
  }

  rowClick(id) {
    this.router.navigate(['/fornecedor/' + id])
  }

  onPageChange(page) {
    this.current_page = page
    this.setClients(page)
  }

  setClients(page) {
    this.apiService.list(page, this.record_per_page, '/fornecedores').subscribe((resp) => {
      this.fornecedores = resp.body
      this.total_records = parseInt(resp.headers.get('Total'))
      this.total_pages = parseInt((this.total_records / this.record_per_page).toFixed(0))
    })
  }

  onPerPageChange(per_page) {
    this.record_per_page = per_page
    this.onPageChange(1)
  }
}
