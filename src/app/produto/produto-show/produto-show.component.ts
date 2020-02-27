import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { ProdutoService } from "../produto.service";
import { Produto } from "../produto";
import { NotificacaoService } from "../../shared/notificacao/notificacao.service";

@Component({
  selector: 'app-produto-show',
  templateUrl: './produto-show.component.html',
  styleUrls: ['./produto-show.component.scss']
})
export class ProdutoShowComponent implements OnInit {
  produto: Produto = new Produto()
  closeResult: string

  constructor(
    private produtoService: ProdutoService,
    private route: ActivatedRoute,
    private router: Router,
    private modalService: NgbModal,
    public notificacaoService: NotificacaoService,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.produtoService.get(params['id']).subscribe(produto => this.produto = produto)
    })
  }

  deleteproduto(produto) {
    this.produtoService.delete(produto).subscribe(
      () => this.router.navigate(['/produtos']),
      (erro) => {
        if (erro.name == 'HttpErrorResponse') {
          if (erro.status == 422) {
            console.log(erro.error['produto'])
            this.notificacaoService.show(erro.error['produto'], 'Erro', { classname: 'bg-danger text-light', delay: 10000 })
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
        this.deleteproduto(this.produto)
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
