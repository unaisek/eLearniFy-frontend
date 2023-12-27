import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmModalComponent } from './components/confirm-modal/confirm-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';


@NgModule({
  declarations: [
    ConfirmModalComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule
  ]
})
export class SharedModule { }
