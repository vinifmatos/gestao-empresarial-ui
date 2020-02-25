import { Component, OnInit } from '@angular/core';
import { Fornecedor } from "../fornecedor";
import { FornecedorService } from "../fornecedor.service";
import { Router, ActivatedRoute } from "@angular/router";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { NotificacaoService } from "../../notificacao/notificacao.service";

@Component({
  selector: 'app-fornecedor-show',
  templateUrl: './fornecedor-show.component.html',
  styleUrls: ['./fornecedor-show.component.scss']
})
export class FornecedorShowComponent implements OnInit {
  fornecedor: Fornecedor = new Fornecedor()
  closeResult: string

  constructor(
    private fornecedorService: FornecedorService,
    private route: ActivatedRoute,
    private router: Router,
    private modalService: NgbModal,
    public notificacaoService: NotificacaoService,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.fornecedorService.get(params['id']).subscribe((fornecedor) => {
        this.fornecedor = Object.assign(new Fornecedor, fornecedor)
      })
    })
  }

  deletefornecedor(fornecedor) {
    this.fornecedorService.delete(fornecedor.id).subscribe(
      () => this.router.navigate(['/fornecedores']),
      (erro) => {
        if (erro.name == 'HttpErrorResponse') {
          if (erro.status == 422) {
            console.log(erro.error['fornecedor'])
            this.notificacaoService.show(erro.error['fornecedor'], 'Erro', { classname: 'bg-danger text-light', delay: 10000 })
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
        this.deletefornecedor(this.fornecedor)
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
