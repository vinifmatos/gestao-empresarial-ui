import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import { Produto } from "./produto";
import { Observable, throwError } from "rxjs";
import { retry, catchError, map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {
  private url: string = "http://localhost:3000/produtos"
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  }

  constructor(
    private http: HttpClient
  ) { }

  getProdutos(page: number, per_page: number): Observable<HttpResponse<Produto[]>> {
    return this.http.get<Produto[]>(`${this.url}/?page=${page}&per_page=${per_page}`, { observe: 'response' }).pipe(
      retry(1),
      catchError(this.errorHandler)
    )
  }

  getProduto(id): Observable<Produto> {
    return this.http.get<Produto>(this.url + '/' + id, this.httpOptions)
      .pipe(
        map(res => Object.assign(new Produto, res as Produto)),
        retry(1),
        catchError(this.errorHandler)
      )
  }

  createProduto(produto): Observable<Produto> {
    return this.http.post<Produto>(this.url, JSON.stringify(produto), this.httpOptions)
      .pipe(
        map(res => Object.assign(new Produto, res as Produto)),
        retry(1),
        catchError(this.errorHandler)
      )
  }

  updateProduto(produto): Observable<Produto> {
    return this.http.put<Produto>(this.url + '/' + produto.id,
      JSON.stringify(produto),
      this.httpOptions)
      .pipe(
        map(res => Object.assign(new Produto, res as Produto)),
        retry(1),
        catchError(this.errorHandler)
      )
  }

  deleteProduto(id): Observable<Produto> {
    return this.http.delete<Produto>(this.url + '/' + id, this.httpOptions)
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
