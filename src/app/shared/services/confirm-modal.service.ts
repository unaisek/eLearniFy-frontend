import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmModalComponent } from '../components/confirm-modal/confirm-modal.component';
import { IConfirmDialog } from 'src/app/models/IConfirmDialog';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfirmModalService {

  constructor( private _dialog:MatDialog) { }

  confirmModal(data:IConfirmDialog): Observable<boolean>{
    return this._dialog.open(ConfirmModalComponent,{
      data,
      width:'400px',
      disableClose:true
    }).afterClosed();
  }
}
