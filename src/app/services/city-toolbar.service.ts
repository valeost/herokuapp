import { map } from 'rxjs/operators';
import { BehaviorSubject, Subject, Observable } from 'rxjs';
import { ToolbarOtions } from './../models/toolbar-options.model';
import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CityToolbarService {
  private _options$ = new BehaviorSubject<ToolbarOtions>({});
  _action$ = new EventEmitter();
  constructor() { }
  config(options: ToolbarOtions) {
    this._options$.next(options);
  }
  getOptions(): Observable<ToolbarOtions> {
    return this._options$.pipe(
      map(
        response => {
          return response;
        })

    );
  };
  dispatchAction() {
    return this._action$.emit();
  }
}
