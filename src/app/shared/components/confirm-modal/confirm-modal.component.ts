import { Component,Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IConfirmDialog } from 'src/app/models/IConfirmDialog';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.css']
})
export class ConfirmModalComponent  {
  constructor(@Inject(MAT_DIALOG_DATA) public data: IConfirmDialog) {
    
  }
}
