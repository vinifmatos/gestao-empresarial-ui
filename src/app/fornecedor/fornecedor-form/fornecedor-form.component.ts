import { Component, OnInit } from '@angular/core';
import { Fornecedor } from "../fornecedor";
import { Router, ActivatedRoute } from "@angular/router";
import { Form } from "../../shared/form";
import { ApiService } from 'src/app/shared/api.service';

@Component({
  selector: 'app-fornecedor-form',
  templateUrl: './fornecedor-form.component.html',
  styleUrls: ['./fornecedor-form.component.scss']
})
export class FornecedorFormComponent extends Form implements OnInit {
  constructor(
    private route: ActivatedRoute,
    router: Router,
    recursoService: ApiService,
  ) {
    super(router)
    this.recurso = new Fornecedor()
    this.recursoService = recursoService
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      var id = params['id']

      this.titulo = id ? `Editar ${this.recurso.humanName()}` : `Novo ${this.recurso.humanName()}`

      if (!id)
        return

      this.recursoService.get(`${this.recurso.className(2)}/${id}`)
        .subscribe(recurso => this.recurso = Object.assign(new Fornecedor(), recurso as Fornecedor))
    })
  }
}
