import { Component, OnInit } from '@angular/core';
import { ClienteService } from "../cliente.service";
import { Cliente } from '../cliente';
import { ActivatedRoute, Router } from "@angular/router";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente-show.component.html',
  styleUrls: ['./cliente-show.component.scss']
})
export class ClienteShowComponent implements OnInit {
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
      this.clienteService.get(params['id']).subscribe((cliente: Cliente) => this.cliente = cliente)
    })
  }

  deleteCliente(cliente) {
    this.clienteService.delete(cliente).subscribe((null));
    this.router.navigate(['/clientes'])
  }

  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      if (result == 'sim') {
        this.deleteCliente(this.cliente)
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
