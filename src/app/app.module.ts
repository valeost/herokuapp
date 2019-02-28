import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CityListComponent } from './city-list/city-list.component';
import { CityDetailComponent } from './city-detail/city-detail.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MatCardModule,
  MatButtonModule,
  MatListModule,
  MatGridListModule,
  MatIconModule,
  MatFormFieldModule,
  MatSnackBarModule,
  MatDialogModule,
  MatInputModule,
  MatToolbarModule
} from '@angular/material';
import { RouterModule } from '@angular/router';
import { CityMapComponent } from './city-map/city-map.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CityToolbarComponent } from './toolbar/toolbar.component';
import { CityDialogComponent } from './city-dialog/city-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    CityListComponent,
    CityDetailComponent,
    CityMapComponent,
    CityDetailComponent,
    CityToolbarComponent,
    CityDialogComponent
    
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
    MatSnackBarModule,
    MatDialogModule,
    MatInputModule,
    MatToolbarModule,
    MatFormFieldModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule 

  ],
  entryComponents: [
    CityDialogComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
