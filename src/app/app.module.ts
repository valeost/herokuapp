import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HerokuListComponent } from './heroku-list/heroku-list.component';
import { HerokuDetailComponent } from './heroku-detail/heroku-detail.component';
import { HerokuUpdateFormComponent } from './heroku-update-form/heroku-update-form.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MatCardModule,
  MatButtonModule,
  MatListModule,
  MatGridListModule,
  MatIconModule,
  MatFormFieldModule
} from '@angular/material';
import { RouterModule } from '@angular/router';
import { HerokuMapComponent } from './heroku-map/heroku-map.component';
import { ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    AppComponent,
    HerokuListComponent,
    HerokuDetailComponent,
    HerokuUpdateFormComponent,
    HerokuMapComponent,
    
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    DragDropModule,
    HttpClientModule,
    MatListModule,
    MatCardModule,
    MatButtonModule,
    MatGridListModule,
    MatIconModule,
    MatFormFieldModule,
    RouterModule,
    ReactiveFormsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
