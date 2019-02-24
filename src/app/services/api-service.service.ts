import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { City } from '../models/city';



@Injectable({
  providedIn: 'root'
})
export class ApiService{
  static listAdviser = "/api/v1/posts";
  static showAdviser = "/api/v1/posts/:id";
  static createAdvise = "/api/v1/posts";
  static updateAdvier = "/api/v1/posts/:id";
  static removeAdviser = "/api/v1/posts/:id";
  
  constructor(
    private _httpClient: HttpClient,
  ) { 

  }
  getList(): Observable<City[]> {
    return this._httpClient.get<City[]>(ApiService.listAdviser);
  }
}
