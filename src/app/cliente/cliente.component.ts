import { Component, OnInit } from '@angular/core';
import { ClienteService } from "./shared/cliente.service";
import { Cliente } from './shared/cliente';
import { ActivatedRoute, Router } from "@angular/router";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.scss']
})
export class ClienteComponent implements OnInit {
  cliente: Cliente = new Cliente()
  closeResult: string

  constructor(
    private clienteService: ClienteService,
    private route: ActivatedRoute,
    private router: Router,
    private modalService: NgbModal,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.clienteService.getCliente(params['id']).subscribe(cliente => this.cliente = cliente)
    })
  }

  deleteCliente(cliente) {
    if (confirm("Excluir o cliente " + cliente.nome + "?")) {
      this.clienteService.deleteCliente(cliente.id).subscribe((null));
      this.router.navigate(['/clientes'])
    }
  }

  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
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
