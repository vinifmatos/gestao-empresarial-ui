import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { retry, catchError, map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private base_url: string = "http://localhost:3000/"
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  }

  constructor(
    private http: HttpClient
  ) { }

  list(page: number, per_page: number, path: string): Observable<HttpResponse<any[]>> {
    return this.http.get<any[]>(`${this.base_url}${path}/?page=${page}&per_page=${per_page}`, { observe: 'response' }).pipe(
      retry(1),
      catchError(this.errorHandler)
    )
  }

  get(path: string): Observable<any> {
    return this.http.get<any>(`${this.base_url}${path}`, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      )
  }

  create(path: string, recurso: any): Observable<any> {
    return this.http.post<any>(`${this.base_url}${path}`, JSON.stringify(recurso), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      )
  }

  update(path: string, recurso: any): Observable<any> {
    return this.http.put<any>(`${this.base_url}${path}/${recurso.id}`,
      JSON.stringify(recurso),
      this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      )
  }

  delete(path: string, recurso: any): Observable<any> {
    return this.http.delete<any>(`${this.base_url}${path}/${recurso.id}`, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      )
  }

  errorHandler(error) {
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      console.error(error);
      return throwError(error.error);
    } else {
      // Get server-side error
      return throwError(error);
    }
  }
}
