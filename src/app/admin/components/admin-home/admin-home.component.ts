import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {
  profileDropDown : boolean = false;
  sideBarDropDown : boolean = false;

  constructor(
     private _router:Router,
     private _adminService: AdminService
     ){}


  ngOnInit(): void {
  }

 
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
