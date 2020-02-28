import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpParams } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { retry, catchError } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private base_url: string = "http://localhost:3000/"
  private headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
  })

  constructor(
    private http: HttpClient
  ) { }

  get(path: string, params: { [k: string]: any } = {}): Observable<HttpResponse<any>> {
    return this.http.get<any>(`${this.base_url}${path}`, { observe: 'response', headers: this.headers, params: params })
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      )
  }

  post(path: string, body: Object = {}): Observable<HttpResponse<any>> {
    return this.http.post<any>(`${this.base_url}${path}`, JSON.stringify(body), { observe: 'response', headers: this.headers })
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      )
  }

  put(path: string, body: Object = {}): Observable<HttpResponse<any>> {
    return this.http.put<any>(`${this.base_url}${path}`, JSON.stringify(body), { observe: 'response', headers: this.headers })
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      )
  }

  delete(path: string): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.base_url}${path}`, { observe: 'response', headers: this.headers })
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
