import { ProdutoService } from './../../produto/produto.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { Produto } from 'src/app/produto/produto';
import { fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'selecao-produto',
  templateUrl: './selecao-produto.component.html',
  styleUrls: ['./selecao-produto.component.scss']
})
export class SelecaoProdutoComponent implements OnInit, AfterViewInit {
  produtos: Produto[];
  @ViewChild('busca') busca: ElementRef;
  @Output() selecionado: EventEmitter<Produto> = new EventEmitter<Produto>();
  current_page: number = 1;
  per_page: number = 25;
  total_records: number = 0;
  input_text: string = '';

  constructor(
    public activeModal: NgbActiveModal,
    private produtoService: ProdutoService,
  ) { }

  ngOnInit(): void {
    this.setProdutos(this.current_page)
  }

  ngAfterViewInit(): void {
    fromEvent(this.busca.nativeElement, 'keyup').pipe(debounceTime(250)).subscribe(() => {
      this.setProdutos(this.current_page)
    })
  }

  onRowClick(linha: HTMLElement, produto: Produto) {
    let class_name = 'table-primary';
    linha.parentElement.querySelectorAll("tr").forEach((e) => e.classList.remove(class_name))
    linha.classList.add(class_name)
    this.selecionado.emit(produto)
  }

  onPageChange(page) {
    this.current_page = page
    this.setProdutos(page)
  }

  onPerPageChange(per_page) {
    this.per_page = per_page
    this.onPageChange(1)
  }

  setProdutos(page) {
    this.produtoService.listar_por_descricao(this.input_text, page, this.per_page).subscribe((resp: any) => {
      this.produtos = resp.produtos
      this.total_records = resp.total_records
    })
  }
}
