import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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
export const material = [
  CommonModule,
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
  MatFormFieldModule
]
@NgModule({
  declarations: [],
  imports: [
    material
  ],
  exports: [
    material
  ]
})
export class AppmatModule { }
