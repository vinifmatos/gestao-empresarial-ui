import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { ProdutoService } from "../produto.service";
import { Produto } from "../produto";

@Component({
  selector: 'app-produto-index',
  templateUrl: './produto-index.component.html',
  styleUrls: ['./produto-index.component.scss']
})
export class ProdutoIndexComponent implements OnInit {
  produtos: Produto[] = []
  current_page: number = 1
  total_pages: number = 0
  total_records: number = 0
  record_per_page: number = 25
  max_pages: number = 7

  constructor(
    private produtoService: ProdutoService,
    private router: Router, ) {
  }

  ngOnInit() {
    this.setClients(this.current_page)
  }

  rowClick(id) {
    this.router.navigate(['/produto/' + id])
  }

  onPageChange(page) {
    this.current_page = page
    this.setClients(page)
  }

  setClients(page) {
    // this.produtoService.getProdutos(page, this.record_per_page).subscribe((resp) => {
    //   this.produtos = resp.body
    //   this.total_records = parseInt(resp.headers.get('Total'))
    //   this.total_pages = parseInt((this.total_records / this.record_per_page).toFixed(0))
    // })
  }

  onPerPageChange(per_page) {
    this.record_per_page = per_page
    this.onPageChange(1)
  }
}
