import { Component } from '@angular/core';
import { IUser } from '../../../models/IUser';
import { TutorService } from '../../services/tutor.service';
import { ToastrService } from 'ngx-toastr';
import { IWallet } from '../../../models/IWallet';

@Component({
  selector: 'app-tutor-profile-view',
  templateUrl: './tutor-profile-view.component.html',
  styleUrls: ['./tutor-profile-view.component.css'],
})
export class TutorProfileViewComponent {
  userDetails: IUser;
  walletDetails: IWallet;
  profileImage: File = null;
  currentContent:string = 'Account Info'

  constructor(
    private _tutorService: TutorService,
    private _toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getUserDetails();
    this.getWalletData();
  }
  getUserDetails() {
    const userId = localStorage.getItem('user');
    this._tutorService.getTutorData(userId).subscribe({
      next: (userData) => {
        this.userDetails = userData;
        console.log(this.userDetails);
      },
    });
  }

  changeImage(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    this.profileImage = fileInput.files[0];

    const formData = new FormData();
    formData.append(
      'profileImage',
      this.profileImage,
      this.profileImage.name || ''
    );
    console.log(this.userDetails?._id);

    formData.append('userId', this.userDetails?._id);
    this._tutorService.uploadProfile(formData).subscribe({
      next: (res) => {
        console.log(res);
        this._toastr.success('Profile photo uploaded');
        this.getUserDetails();
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  getWalletData(){
    const tutorId = localStorage.getItem('user');
    this._tutorService.getWalletData(tutorId).subscribe((wallet)=>{
      console.log(wallet,"wallet");
      
      this.walletDetails = wallet;
    })
  }

  changeContent(content:string){
    if(content == "account"){
      this.currentContent = "Account Info"
    }else {
      this.currentContent = "Wallet Info"
    }
  }
}
