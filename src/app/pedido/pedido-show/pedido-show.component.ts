import { Component, OnInit } from '@angular/core';
import { Pedido } from '../pedido';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { NotificacaoService } from "../../shared/notificacao/notificacao.service";
import { PedidoService } from '../pedido.service';

@Component({
  selector: 'app-pedido-show',
  templateUrl: './pedido-show.component.html',
  styleUrls: ['./pedido-show.component.scss']
})
export class PedidoShowComponent implements OnInit {
  pedido: Pedido = new Pedido()
  closeResult: string

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private modalService: NgbModal,
    public notificacaoService: NotificacaoService,
    private pedidoService: PedidoService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.pedidoService.get(params['id']).subscribe((pedido) => this.pedido = pedido)
    })
  }

  deletepedido(pedido: Pedido) {
    this.pedidoService.delete(pedido).subscribe(
      () => this.router.navigate(['/pedidos']),
      (erro) => {
        if (erro.name == 'HttpErrorResponse') {
          if (erro.status == 422) {
            console.log(erro.error['pedido'])
            this.notificacaoService.show(erro.error['pedido'], 'Erro', { classname: 'bg-danger text-light', delay: 10000 })
            console.log(this.notificacaoService.notificacoes)
            return
          }
        }
        console.error(erro)
        return
      }
    );
  }

  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      if (result == 'sim') {
        this.deletepedido(this.pedido)
      }
    });
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
}
