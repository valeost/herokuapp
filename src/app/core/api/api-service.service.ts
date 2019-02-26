
import { City } from './../../models/city';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';




@Injectable({
  providedIn: 'root'
})
export class ApiService{
  private _urlAdviser = "/api/v1/posts";
  constructor(
    private _httpClient: HttpClient,
  ) { 
  }
  getList(): Observable<City[]> {
    
    return this._httpClient.get<City[]>(this._urlAdviser, { observe: 'response' }).pipe(
     map((response) => {
       return response.body;
     }),
      catchError(this.handleError)
    );
  };
  showCity(id: number): Observable<City> {
    return this._httpClient.get<City>(`${this._urlAdviser}/${id}`, { observe: 'response' }).pipe(
      map((response) => {
        return response.body;
      }),
      catchError(this.handleError)
    );
  };
  updateCity(id: number) {
    return this._httpClient.put<City>(`${this._urlAdviser}/${id}`, { observe: 'response' }).pipe(
      map((response) => {
        return response;
      }),
      catchError(this.handleError)
    );
  }
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  };
}
