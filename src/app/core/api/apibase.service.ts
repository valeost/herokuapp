import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ApibaseService implements OnDestroy {

  subscription: Subscription;
  private _endpoint$ = new BehaviorSubject({});
  constructor(private _http: HttpClient) {
    debugger;
    this.subscription = this._http.get(environment.endpoint).subscribe((config) => {
      this._endpoint$.next(config);
    });
  }
  public get() {
    return this._endpoint$;
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
