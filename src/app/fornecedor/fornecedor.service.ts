import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import { Fornecedor } from "./fornecedor";
import { Observable, throwError } from "rxjs";
import { retry, catchError, map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class FornecedorService {
  private url: string = "http://localhost:3000/fornecedores"
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  }

  constructor(
    private http: HttpClient
  ) { }

  list(page: number, per_page: number): Observable<HttpResponse<Fornecedor[]>> {
    return this.http.get<Fornecedor[]>(`${this.url}/?page=${page}&per_page=${per_page}`, { observe: 'response' }).pipe(
      retry(1),
      catchError(this.errorHandler)
    )
  }

  get(id): Observable<Fornecedor> {
    return this.http.get<Fornecedor>(this.url + '/' + id, this.httpOptions)
      .pipe(
        map(res => Object.assign(new Fornecedor, res as Fornecedor)),
        retry(1),
        catchError(this.errorHandler)
      )
  }

  create(fornecedor): Observable<Fornecedor> {
    return this.http.post<Fornecedor>(this.url, JSON.stringify(fornecedor), this.httpOptions)
      .pipe(
        map(res => Object.assign(new Fornecedor, res as Fornecedor)),
        retry(1),
        catchError(this.errorHandler)
      )
  }

  update(fornecedor): Observable<Fornecedor> {
    return this.http.put<Fornecedor>(this.url + '/' + fornecedor.id,
      JSON.stringify(fornecedor),
      this.httpOptions)
      .pipe(
        map(res => Object.assign(new Fornecedor, res as Fornecedor)),
        retry(1),
        catchError(this.errorHandler)
      )
  }

  delete(id): Observable<Fornecedor> {
    return this.http.delete<Fornecedor>(this.url + '/' + id, this.httpOptions)
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
