import { Component, OnInit } from '@angular/core';
import { Produto } from "../produto";
import { ProdutoService } from "../produto.service";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-produto-form',
  templateUrl: './produto-form.component.html',
  styleUrls: ['./produto-form.component.scss']
})
export class ProdutoFormComponent implements OnInit {
  titulo: string
  produto: Produto = new Produto()
  backRoute: string

  constructor(
    private produtoService: ProdutoService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      var id = params['id']

      this.titulo = id ? 'Editar Produto' : 'Novo Produto'
      this.backRoute = id ? '/produto/' + id : '/produtos'

      if (!id)
        return

      this.produtoService.get(id)
        .subscribe(produto => this.produto = new Produto(
          produto.id,
          produto.descricao,
          produto.preco,
        ))
    })
  }

  onSubmit() {
    var result

    if (this.produto.id) {
      result = this.produtoService.update(this.produto)
    } else {
      result = this.produtoService.create(this.produto)
    }
    result.subscribe(
      produto => this.router.navigate(['/produto/' + produto.id]),
      erro => (this.errorHandle(erro)))
  }

  errorHandle(erro) {
    if (erro instanceof ErrorEvent) {
      console.log(erro.message)
      return
    }

    if (erro.name == 'HttpErrorResponse') {
      if (erro.status == 422) {
        console.log(erro);

        var els
        els = document.getElementsByClassName('invalid-feedback')
        Array.prototype.forEach.call(els, (e) => {
          e.innerHTML = ''
        })
        els = document.getElementsByClassName('is-invalid')
        Array.prototype.forEach.call(els, (e) => {
          e.classList.remove('is-invalid')
          e.classList.add('is-valid')
        })
        for (var prop in erro.error) {
          document.getElementById(`produto_${prop.replace('.', '_')}`).classList.add('is-invalid')
          var el = document.getElementById(`produto_${prop.replace('.', '_')}`).parentElement.getElementsByClassName('invalid-feedback')[0]
          el.append(`${erro.error[prop]}`)
        }
        return
      }
    }
    console.error(erro)
  }
}