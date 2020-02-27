import { Injectable } from '@angular/core';
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class Form {
  titulo: string
  recurso: any
  protected recursoService: any

  constructor(
    protected router: Router,
  ) { }


  onSubmit() {
    var result

    if (this.recurso.id) {
      result = this.recursoService.update(this.recurso)
    } else {
      result = this.recursoService.create(this.recurso)
    }
    result.subscribe(
      recurso => this.router.navigate([this.recurso.className(), recurso.id]),
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
          document.getElementById(`${this.recurso.className().toLowerCase()}_${prop.replace('.', '_')}`).classList.add('is-invalid')
          var el = document.getElementById(`${this.recurso.className().toLowerCase()}_${prop.replace('.', '_')}`).parentElement.getElementsByClassName('invalid-feedback')[0]
          el.append(`${erro.error[prop]}`)
        }
        return
      }
    }
    console.error(erro)
  }
}
