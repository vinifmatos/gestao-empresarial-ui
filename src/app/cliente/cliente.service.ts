import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { ApiService } from '../shared/api.service';
import { map } from 'rxjs/operators';
import { Cliente } from './cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private path: string = "clientes"

  constructor(
    private apiService: ApiService
  ) { }

  private fromJSON(cliente: Cliente): Cliente {

    return new Cliente(
      cliente.id,
      cliente.nome,
      cliente.telefone,
      cliente.email,
      cliente.endereco_cliente
    )
  }

  list(page?: number, per_page?: number): Observable<Object> {
    var paginate = {}
    if (page && per_page)
      paginate = { page: page, per_page: per_page }
    return this.apiService.get(this.path, paginate).pipe(map((resp) => {
      return {
        total_records: parseInt(resp.headers.get('Total')),
        clientes: resp.body.map((cliente: Cliente) => this.fromJSON(cliente))
      }
    }))
  }

  get(id: number): Observable<Cliente> {
    return this.apiService.get(`${this.path}/${id}`).pipe(map((resp) => this.fromJSON(resp.body)))
  }

  create(cliente: Cliente): Observable<Cliente> {
    return this.apiService.post(`${this.path}`, cliente).pipe(map((resp) => this.fromJSON(resp.body)))
  }

  update(cliente: Cliente): Observable<Cliente> {
    return this.apiService.put(`${this.path}/${cliente.id}`, cliente).pipe(map((resp) => this.fromJSON(resp.body)))
  }

  delete(cliente: Cliente): Observable<Object> {
    return this.apiService.delete(`${this.path}/${cliente.id}`).pipe(map((resp) => resp.body))
  }
}
