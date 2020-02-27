import { Injectable } from '@angular/core';
import { Produto } from "./produto";
import { Observable } from "rxjs";
import { ApiService } from '../shared/api.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {
  private path: string = "produtos"

  constructor(
    private apiService: ApiService
  ) { }

  private fromJSON(produto: Produto): Produto {

    return new Produto(
      produto.id,
      produto.descricao,
      produto.preco
    )
  }

  list(page?: number, per_page?: number): Observable<Object> {
    var paginate = {}
    if (page && per_page)
      paginate = { page: page, per_page: per_page }
    return this.apiService.get(this.path, paginate).pipe(map((resp) => {
      return {
        total_records: parseInt(resp.headers.get('Total')),
        produtos: resp.body.map((produto: Produto) => this.fromJSON(produto))
      }
    }))
  }

  get(id: number): Observable<Produto> {
    return this.apiService.get(`${this.path}/${id}`).pipe(map((resp) => this.fromJSON(resp.body)))
  }

  create(produto: Produto): Observable<Produto> {
    return this.apiService.post(`${this.path}`, produto).pipe(map((resp) => this.fromJSON(resp.body)))
  }

  update(produto: Produto): Observable<Produto> {
    return this.apiService.put(`${this.path}/${produto.id}`, produto).pipe(map((resp) => this.fromJSON(resp.body)))
  }

  delete(produto: Produto): Observable<Object> {
    return this.apiService.delete(`${this.path}/${produto.id}`).pipe(map((resp) => resp.body))
  }
}
