import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApibaseService implements OnDestroy {

  subscription: Subscription;
  private _endpoint$ = new BehaviorSubject({});
  constructor(private _http: HttpClient) {
    this.subscription = this._http.get("assets/api.config.json").subscribe((config) => {
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
