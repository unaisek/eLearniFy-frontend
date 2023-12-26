import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { IUser } from 'src/app/models/IUser';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  userDetails: IUser;
  profileImage: File = null

  constructor(private _userService: UserService,
    private _toastr:ToastrService) {}

  ngOnInit(): void {
    this.getUserDetails();
  }
  getUserDetails() {
    const userId = localStorage.getItem('user');
    this._userService.getUserData(userId).subscribe({
      next: (userData) => {
        this.userDetails = userData;
        console.log(this.userDetails);
      },
    });
  }

  changeImage(event:Event){
    
    const fileInput = event.target as HTMLInputElement;
    this.profileImage = fileInput.files[0];

    const formData = new FormData();
    formData.append('profileImage',this.profileImage,this.profileImage.name || '')
    console.log(this.userDetails?._id);
    
    formData.append('userId',this.userDetails?._id)
    this._userService.uploadProfile(formData).subscribe({
      next:(res)=>{
        console.log(res);
        this._toastr.success("Profile photo uploaded")
        this.getUserDetails();
      },
      error:(error)=>{
        console.log(error);
        
      }
    })
  }
}
