import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent {
  profileDropDown : boolean = false;
  sideBarDropDown : boolean = false;

  ProfileToggleDropDown(){
    this.profileDropDown = !this.profileDropDown    
  }

  sideBarToggle(){
    this.sideBarDropDown = !this.sideBarDropDown
  }
}
