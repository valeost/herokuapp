import { ExtraOptions } from '@angular/router';
import { City } from './../models/city';


import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { ConfigService } from '../core/api/config.service';




@Injectable({
  providedIn: 'root'
})
export class ApiService{
  private _urlAdviser = "/api/v1/posts";

  constructor(
    private _httpClient: HttpClient,
    private _apiConfig: ConfigService
    // private _notification: NotificationsService
  ) { 
  }
  getList(): Observable<City[]> {
    
    return this._apiConfig.get<City[]>("endpoint").pipe(
      map((response) => {
        return response;
      }),
       catchError(this.handleError)
     );
  };
  showCity(id: number): Observable<City> {

    let params = new HttpParams().append('id', id.toString());
    return this._apiConfig.get<City>("endpoint", {params}, id).pipe(
      map((response) => {
        return response;
      }),
      catchError(this.handleError)
    );
  };
  updateCity(id: number, city: City): Observable<City> {
    return this._apiConfig.put<City>("endpoint", null, id , city).pipe(
      map((response) => {
        return response;
      }),
      catchError(this.handleError)
    );
  };
  createCity(city: City) {
    return this._apiConfig.post<City>("endpoint", null, city).pipe(
      map((response) => {
        return response;
      }),
      catchError(this.handleError)
    ); 
  };
  deleteCity(id: number) {
    return this._apiConfig.delete<City>("endpoint", null, id, null).pipe(
      map((response) => {
        return response;
      }),
      catchError(this.handleError)
    ); 
  };
  // Si backend devuelve un mensaje de error al cliente especifico gestionar lo aquí
  public handleError(error: HttpErrorResponse) {
    let msg = 'Something bad happened; please try again later';
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
      msg = `An error occurred: ${error.error.message}`;
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
        msg = `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`;
    };
   
    return throwError(
      msg);
      
  };
  
}
