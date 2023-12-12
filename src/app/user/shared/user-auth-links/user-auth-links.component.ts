import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-auth-links',
  templateUrl: './user-auth-links.component.html',
  styleUrls: ['./user-auth-links.component.css']
})
export class UserAuthLinksComponent implements OnInit {
  isAuthenticated: boolean = false;

  constructor(private _router:Router){}

  ngOnInit(): void {
    this.checkAuthentication()
  }

  checkAuthentication(){
    const token = localStorage.getItem('authToken');
    if(token){
      this.isAuthenticated = true
    } else {
      this.isAuthenticated = false
    }
  }

  logout(){
    const token = localStorage.getItem('authToken');
    if (token) {
      localStorage.removeItem('authToken');
      this._router.navigate(['/login']);
    }
  }
}
