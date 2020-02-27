import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pedido } from './pedido';
import { ApiService } from '../shared/api.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  private path: string = 'pedidos'

  constructor(
    private apiService: ApiService
  ) { }

  private fromJSON(pedido) {

    return new Pedido(
      pedido.id,
      pedido.cliente,
      pedido.situacao,
      pedido.prazo_entrega,
      pedido.data_entrega,
      pedido.data,
      pedido.pedido_itens
    )
  }

  list(page: number, per_page: number): Observable<Object> {
    return this.apiService.get(this.path, { page: page, per_page: per_page }).pipe(map((resp) => {
      return {
        total_records: parseInt(resp.headers.get('Total')),
        pedidos: resp.body.map((pedido: Pedido) => this.fromJSON(pedido))
      }
    }))
  }

  get(id: number): Observable<Pedido> {
    return this.apiService.get(`${this.path}/${id}`).pipe(map((resp) => this.fromJSON(resp.body)))
  }

  create(pedido: Pedido): Observable<Pedido> {
    return this.apiService.post(`${this.path}`, pedido).pipe(map((resp) => this.fromJSON(resp.body)))
  }

  update(pedido: Pedido): Observable<Pedido> {
    return this.apiService.put(`${this.path}/${pedido.id}`, pedido).pipe(map((resp) => this.fromJSON(resp.body)))
  }

  delete(pedido: Pedido): Observable<Object> {
    return this.apiService.delete(`${this.path}/${pedido.id}`).pipe(map((resp) => resp.body))
  }
}
