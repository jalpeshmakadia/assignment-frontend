import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import {Observable, throwError} from 'rxjs';
import {catchError, tap, map} from 'rxjs/operators';
import { LoaderEnabled } from './loader.service'

export interface IProduct {
  id: Boolean;
  model: string;
  ram: string;
  hdd: string;
  location: string;
  price: string;
}


@Injectable({
  providedIn: 'root'
})
export class DataService {

  productList = environment.apiUrl + '/api/products';

  constructor(private http: HttpClient) {

  }

  @LoaderEnabled()
  getProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(this.productList).pipe(
      tap(data => data),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(`Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}
