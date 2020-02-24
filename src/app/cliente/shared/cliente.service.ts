import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Cliente } from "./cliente";
import { Observable, throwError } from "rxjs";
import { retry, catchError, map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private url: string = "http://localhost:3000/clientes"
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private http: HttpClient) { }

  getClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.url, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      )
  }

  getCliente(id): Observable<Cliente> {
    return this.http.get<Cliente>(this.url + '/' + id, this.httpOptions)
      .pipe(
        map(res => Object.assign(new Cliente, res as Cliente)),
        retry(1),
        catchError(this.errorHandler)
      )
  }

  createCliente(cliente): Observable<Cliente> {
    return this.http.post<Cliente>(this.url, JSON.stringify(cliente), this.httpOptions)
      .pipe(
        map(res => Object.assign(new Cliente, res as Cliente)),
        retry(1),
        catchError(this.errorHandler)
      )
  }

  updateCliente(cliente): Observable<Cliente> {
    return this.http.put<Cliente>(this.url + '/' + cliente.id,
      JSON.stringify(cliente),
      this.httpOptions)
      .pipe(
        map(res => Object.assign(new Cliente, res as Cliente)),
        retry(1),
        catchError(this.errorHandler)
      )
  }

  deleteCliente(id): Observable<Cliente> {
    return this.http.delete<Cliente>(this.url + '/' + id, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      )
  }

  errorHandler(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
      console.log(errorMessage);
      return throwError(error.error);
    } else {
      // Get server-side error
      return throwError(error);
    }
  }
}
