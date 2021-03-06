import { SelecaoProdutoComponent } from './../selecao-produto/selecao-produto.component';
import { Component, OnInit } from '@angular/core';
import { Form } from 'src/app/shared/form';
import { ActivatedRoute, Router } from '@angular/router';
import { Pedido } from '../pedido';
import { PedidoItem } from '../pedido-item';
import { Produto } from 'src/app/produto/produto';
import { NgbModal, NgbDateParserFormatter, NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';
import { faTrash, faCalendarAlt, faSearch } from '@fortawesome/free-solid-svg-icons';
import { CustomDateParserFormatterService } from 'src/app/shared/custom-date-parser-formatter.service';
import { CustomDateAdapterService } from 'src/app/shared/custom-date-adapter.service';
import { PedidoService } from '../pedido.service';
import { ModalSelecaoClienteComponent } from '../modal-selecao-cliente/modal-selecao-cliente.component';
import { Cliente } from 'src/app/cliente/cliente';

@Component({
  selector: 'app-pedido-form',
  templateUrl: './pedido-form.component.html',
  styleUrls: ['./pedido-form.component.scss'],
  providers: [{ provide: NgbDateParserFormatter, useClass: CustomDateParserFormatterService },
  { provide: NgbDateAdapter, useClass: CustomDateAdapterService }]
})
export class PedidoFormComponent extends Form implements OnInit {
  novo_produto: Produto = new Produto
  produtos: Produto[]
  produtos_removidos: Produto[] = []
  faTrash = faTrash;
  faCalendarAlt = faCalendarAlt;
  startDate = {}
  faSearch = faSearch

  constructor(
    private route: ActivatedRoute,
    router: Router,
    recursoService: PedidoService,
    private modalService: NgbModal,
  ) {
    super(router)
    this.recursoService = recursoService
    this.recurso = new Pedido()
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      var id = params['id']
      this.titulo = id ? `Editar ${this.recurso.humanName()}` : `Novo ${this.recurso.humanName()}`

      if (!id)
        return

      this.recursoService.get(id).subscribe(recurso => this.recurso = recurso)
    })
  }

  deletePedidoItem(index) {
    if (this.recurso.pedido_itens[index].id) {
      var item = this.recurso.pedido_itens[index]
      item._destroy = true
      this.produtos_removidos.push(item)
    }
    this.recurso.pedido_itens.splice(index, 1)
  }

  addPedidoItem(produto) {
    this.recurso.pedido_itens.push(new PedidoItem(null, produto, 1, produto.preco, produto.preco))
  }

  onQtdChange(index) {
    var item = this.recurso.pedido_itens[index]
    this.recurso.pedido_itens[index].valor_total = (item.quantidade * item.valor_unitario).toFixed(2)
  }

  onSubmit() {
    var result

    if (this.recurso.id) {
      this.recurso.pedido_itens = this.recurso.pedido_itens.concat(this.produtos_removidos)
      result = this.recursoService.update(this.recurso)
    } else {
      result = this.recursoService.create(this.recurso)
    }
    result.subscribe(
      recurso => this.router.navigate([this.recurso.className(), recurso.id]),
      erro => (this.errorHandle(erro)))
  }

  openSelecaoCliente() {
    const modalRef = this.modalService.open(ModalSelecaoClienteComponent, { scrollable: true });
    var selecionado: Cliente = null;
    modalRef.componentInstance.cliente_selecionado = this.recurso.cliente;
    modalRef.componentInstance.selecionado.subscribe((cliente) => selecionado = cliente)
    modalRef.result.then((result) => {
      if (result) {
        this.recurso.cliente = selecionado
      }
    })
  }

  openSelecaoProduto() {
    const modalRef = this.modalService.open(SelecaoProdutoComponent, { scrollable: true });
    var selecionado: Produto = null;
    modalRef.componentInstance.cliente_selecionado = this.recurso.cliente;
    modalRef.componentInstance.selecionado.subscribe((cliente) => selecionado = cliente)
    modalRef.result.then((result) => {
      if (result) {
        this.addPedidoItem(selecionado)
      }
    })
  }
}
