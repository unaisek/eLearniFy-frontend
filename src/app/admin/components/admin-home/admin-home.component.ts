import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent {
  profileDropDown : boolean = false;
  sideBarDropDown : boolean = false;

  constructor( private _router:Router){}

  ProfileToggleDropDown(){
    this.profileDropDown = !this.profileDropDown    
  }

  sideBarToggle(){
    this.sideBarDropDown = !this.sideBarDropDown
  }

  onLogout(){
    const authtoken = 'adminAuthToken';

    localStorage.removeItem(authtoken);
    this._router.navigate(['/admin/login'])

  }
}
