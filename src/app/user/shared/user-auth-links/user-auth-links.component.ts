import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { IUser } from '../../../models/IUser';

@Component({
  selector: 'app-user-auth-links',
  templateUrl: './user-auth-links.component.html',
  styleUrls: ['./user-auth-links.component.css'],
})
export class UserAuthLinksComponent implements OnInit {
  isAuthenticated: boolean = false;
  userDetails:IUser;
  constructor(
    private _router: Router,
    private _userService:UserService
    ) {}

  ngOnInit(): void {
    this.checkAuthentication();
    this.getUserData();
    
  }

  checkAuthentication() {
    const token = localStorage.getItem('authToken');
    if (token) {
      this.isAuthenticated = true;
    } else {
      this.isAuthenticated = false;
    }
  }

  getUserData(){
    const userId = localStorage.getItem('user');
    this._userService.getUserData(userId).subscribe({
      next:(res)=>{
        this.userDetails = res
      }
    })
  }

  logout() {
    const token = localStorage.getItem('authToken');
    if (token) {
      localStorage.clear();
      this._router.navigate(['/login']);
    }
  }
  onclickProfile(){
    this._router.navigate(['/user/profile'])
  }
}
