import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from 'src/app/models/IUser';
import { TutorService } from '../../services/tutor.service';
import { ConfirmModalService } from 'src/app/shared/services/confirm-modal.service';

@Component({
  selector: 'app-tutor-profile',
  templateUrl: './tutor-profile.component.html',
  styleUrls: ['./tutor-profile.component.css'],
})
export class TutorProfileComponent implements OnInit {
  userDetails: IUser;

  constructor(
    private _router: Router,
    private _tutorService: TutorService,
    private _dialogService:ConfirmModalService
    ) {}
  ngOnInit(): void {
    this.getUserDetails();
  }

  getUserDetails() {
    const userId = localStorage.getItem('user');
    this._tutorService.getTutorData(userId).subscribe({
      next: (data) => {
        this.userDetails = data;
      },
    });
  }

  logout() {
    this._dialogService.confirmModal({
      title: 'Please confirm action',
      message: 'Are you sure want to logout!',
      confirmText: 'Yes',
      cancelText: 'No',
    }).subscribe((confirm)=>{
      if(confirm){
        const token = localStorage.getItem('tutorAuthToken');
        if (token) {
          localStorage.clear();
          this._router.navigate(['/login']);
        } else {
          this._router.navigate(['/login']);
        }
      }
    })   
  }

  onclickProfile(){
    this._router.navigate(['/tutor/profile'])
  }
}
