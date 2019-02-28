import { filter, concatMap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpParams, HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApibaseService } from './apibase.service';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  constructor(private _http: HttpClient, private _apiBase: ApibaseService) {}
  public get<T>(endpoint: string, options?: {
    headers?: HttpHeaders | {
      [header: string]: string | string[];
    };
    observe?: 'body';
    params?: HttpParams | {
      [param: string]: string | string[];
    };
    reportProgress?: boolean;
    responseType?: 'json';
    withCredentials?: boolean;
  }, param?: any): Observable<T> {
    return this._apiBase.get().pipe(
      filter((endpointConfig) => !!endpointConfig[endpoint]),
      concatMap(endpointConfig => {
        let endpointT = endpointConfig[endpoint];
        
        if(param) {
          endpointT=`${endpointT}/${param}` || endpointT; 
        }
          
        
        return this._http.get<T>(endpointT);
      }
      )
    );

  };
  public put<T>(endpoint: string, options?: {
    headers?: HttpHeaders | {
      [header: string]: string | string[];
    };
    observe?: 'body';
    params?: HttpParams | {
      [param: string]: string | string[];
    };
    reportProgress?: boolean;
    responseType?: 'json';
    withCredentials?: boolean;
  }, param?: any,  obj?: T): Observable<T> {
    return this._apiBase.get().pipe(
      filter((endpointConfig) => !!endpointConfig[endpoint]),
      concatMap(endpointConfig => {
        let endpointT = endpointConfig[endpoint];
        if(param) {
          endpointT=`${endpointT}/${param}` || endpointT; 
        }
        return this._http.put<T>(endpointT, obj);
      }
      )
    );

  };
  public post<T>(endpoint: string, options?: {
    headers?: HttpHeaders | {
      [header: string]: string | string[];
    };
    observe?: 'body';
    params?: HttpParams | {
      [param: string]: string | string[];
    };
    reportProgress?: boolean;
    responseType?: 'json';
    withCredentials?: boolean;
  }, obj?: T): Observable<T> {
    return this._apiBase.get().pipe(
      filter((endpointConfig) => !!endpointConfig[endpoint]),
      concatMap(endpointConfig => {
        let endpointT = endpointConfig[endpoint];
        return this._http.post<T>(endpointT, obj);
      }
      )
    );

  };
  public delete<T>(endpoint: string, options?: {
    headers?: HttpHeaders | {
      [header: string]: string | string[];
    };
    observe?: 'body';
    params?: HttpParams | {
      [param: string]: string | string[];
    };
    reportProgress?: boolean;
    responseType?: 'json';
    withCredentials?: boolean;
  }, param?: any,  obj?: T): Observable<T> {
    return this._apiBase.get().pipe(
      filter((endpointConfig) => !!endpointConfig[endpoint]),
      concatMap(endpointConfig => {
        let endpointT = endpointConfig[endpoint];
        if(param) {
          endpointT=`${endpointT}/${param}` || endpointT; 
        }
        return this._http.delete<T>(endpointT);
      }
      )
    );

  };  
}
