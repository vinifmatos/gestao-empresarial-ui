import { Form } from 'src/app/shared/form';
import { Component, OnInit } from '@angular/core';
import { Cliente } from "../cliente";
import { Router, ActivatedRoute } from "@angular/router";

import { ClienteService } from "../cliente.service";

@Component({
  selector: 'app-cliente-form',
  templateUrl: './cliente-form.component.html',
  styleUrls: ['./cliente-form.component.scss']
})
export class ClienteFormComponent extends Form implements OnInit {
  constructor(
    recursoService: ClienteService,
    router: Router,
    private route: ActivatedRoute
  ) {
    super(router)
    this.recursoService = recursoService
    this.recurso = new Cliente()
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      var id = params['id']

      this.titulo = id ? `Editar ${this.recurso.humanName()}` : `Novo ${this.recurso.humanName()}`

      if (!id)
        return

      this.recursoService.get(id).subscribe((cliente: Cliente) => this.recurso = cliente)
    })
  }
}
