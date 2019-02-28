import { Component, OnInit, EventEmitter, OnDestroy } from '@angular/core';
import { CityToolbarService } from '../services/city-toolbar.service';
import { ToolbarOtions } from '../models/toolbar-options.model';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-city-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class CityToolbarComponent implements OnInit, OnDestroy {

  options: ToolbarOtions;
  subscriptions: Subscription[]=[];
  constructor(private _CityToolbarService: CityToolbarService) { 

  }

  ngOnInit() {
    let subs = this._CityToolbarService.getOptions().subscribe(
      response => {
        this.options = response;
      }
    );
    this.subscriptions.push(subs);
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach(subscriptor => {
      subscriptor.unsubscribe();
    });
  }
  onClick() {
    console.log('Toolbar action emitted');
    this._CityToolbarService.dispatchAction();
  }
}
