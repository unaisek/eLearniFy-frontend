import { Component, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmModalService } from 'src/app/shared/services/confirm-modal.service';

@Component({
  selector: 'app-tutor-menu',
  templateUrl: './tutor-menu.component.html',
  styleUrls: ['./tutor-menu.component.css'],
})
export class TutorMenuComponent {
  @Output() menuItemSelected: EventEmitter<void> = new EventEmitter<void>();

  constructor(
    private _dialogService:ConfirmModalService,
    private _router: Router
  ) {}

  onClickMenu() {
    this.menuItemSelected.emit();
  }
  logout() {
    this._dialogService
      .confirmModal({
        title: 'Please confirm action',
        message: 'Are you sure want to logout!',
        confirmText: 'Yes',
        cancelText: 'No',
      })
      .subscribe((confirm) => {
        if (confirm) {
          const token = localStorage.getItem('tutorAuthToken');
          if (token) {
            localStorage.clear();
            this._router.navigate(['/login']);
          } else {
            this._router.navigate(['/login']);
          }
        }
      });
  }
}
