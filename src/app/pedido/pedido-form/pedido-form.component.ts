import { Component, OnInit } from '@angular/core';
import { Form } from 'src/app/shared/form';
import { ActivatedRoute, Router } from '@angular/router';
import { Pedido } from '../pedido';
import { PedidoItem } from '../pedido-item';
import { Produto } from 'src/app/produto/produto';
import { NgbModal, ModalDismissReasons, NgbDateParserFormatter, NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';
import { faTrash, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { CustomDateParserFormatterService } from 'src/app/shared/custom-date-parser-formatter.service';
import { CustomDateAdapterService } from 'src/app/shared/custom-date-adapter.service';
import { PedidoService } from '../pedido.service';

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

      this.recursoService.get(id)
        .subscribe(recurso => {
          this.recurso = recurso

          var d = this.recurso.data.split('/')
          this.startDate = { year: parseInt(d[2]), month: parseInt(d[1]), day: parseInt(d[0]) }
        })
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
    this.recurso.pedido_itens.push(new PedidoItem(null, produto, 1, produto.preco, 1 * produto.preco))
  }

  open(content) {
    this.getProdutos()
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      if (result == 'sim') {
        this.addPedidoItem(this.novo_produto)
      }
    });
  }

  getProdutos() {
    this.recursoService.get(this.novo_produto.className(2)).subscribe((produtos) => {
      this.produtos = produtos.map((produto) => Object.assign(new Produto, produto))
    })
  }

  onProdutoRowClick(linha, index) {
    Array.prototype.forEach.call(document.getElementsByClassName('table-primary'), (e) => {
      e.classList.remove('table-primary')
    })
    linha.classList.toggle('table-primary')
    this.novo_produto = this.produtos[index]
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
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
}
