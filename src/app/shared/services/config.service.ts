import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Product } from './../models/product.service';

import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  apiURL = 'http://localhost:4000';

  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  getProducts(): Observable<Product> {
    return this.http
      .get<Product>(this.apiURL + '/products')
      .pipe(retry(1), catchError(this.handleError));
  }

  getProduct(id: string): Observable<Product> {
    return this.http
      .get<Product>(this.apiURL + '/products/' + id)
      .pipe(retry(1), catchError(this.handleError));
  }

  createProduct(product: any): Observable<Product> {
    return this.http
      .post<Product>(
        this.apiURL + '/products',
        JSON.stringify(product),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  updateProduct(id: string, product: any): Observable<Product> {
    return this.http
      .put<Product>(
        this.apiURL + '/products/' + id,
        JSON.stringify(product),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  deleteProduct(id: string) {
    return this.http
      .delete<Product>(this.apiURL + '/products/' + id, this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }

  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }
}
