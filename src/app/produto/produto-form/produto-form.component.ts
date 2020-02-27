import { Component, OnInit } from '@angular/core';
import { Produto } from "../produto";
import { ProdutoService } from "../produto.service";
import { Router, ActivatedRoute } from "@angular/router";
import { Form } from 'src/app/shared/form';

@Component({
  selector: 'app-produto-form',
  templateUrl: './produto-form.component.html',
  styleUrls: ['./produto-form.component.scss']
})
export class ProdutoFormComponent extends Form implements OnInit {
  constructor(
    recursoService: ProdutoService,
    router: Router,
    private route: ActivatedRoute
  ) {
    super(router)
    this.recursoService = recursoService
    this.recurso = new Produto()
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      var id = params['id']

      this.titulo = id ? 'Editar Produto' : 'Novo Produto'

      if (!id)
        return

      this.recursoService.get(id).subscribe(produto => this.recurso = produto)
    })
  }
}