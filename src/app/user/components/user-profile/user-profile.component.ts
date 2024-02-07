import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { IUser } from '../../../models/IUser';
import { ToastrService } from 'ngx-toastr';
import { IWallet } from '../../../models/IWallet';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  userDetails: IUser;
  walletDetails: IWallet;
  profileImage: File = null;
  currentContent: string = 'Account Info';

  constructor(
    private _userService: UserService,
    private _toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getUserDetails();
    this.getWalletDetails();
  }
  getUserDetails() {
    const userId = localStorage.getItem('user');
    this._userService.getUserData(userId).subscribe({
      next: (userData) => {
        this.userDetails = userData;
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

    formData.append('userId', this.userDetails?._id);
    this._userService.uploadProfile(formData).subscribe({
      next: (res) => {
        this._toastr.success('Profile photo uploaded');
        this.getUserDetails();
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  getWalletDetails() {
    const userId = localStorage.getItem('user');
    this._userService.getWalletData(userId).subscribe((wallet) => {
      this.walletDetails = wallet;
    });
  }

  changeContent(content: string) {
    if (content == 'account') {
      this.currentContent = 'Account Info';
    } else {
      this.currentContent = 'Wallet Info';
    }
  }
}
