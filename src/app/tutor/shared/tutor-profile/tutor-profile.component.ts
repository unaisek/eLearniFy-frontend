import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tutor-profile',
  templateUrl: './tutor-profile.component.html',
  styleUrls: ['./tutor-profile.component.css']
})
export class TutorProfileComponent {

  constructor(private _router:Router) {
    
  }

  logout(){
    const token = localStorage.getItem('tutorAuthToken');
    if(token){
      localStorage.removeItem('tutorAuthToken');
      this._router.navigate(['/login']);
    } else {
       this._router.navigate(['/login']);
    }
  }
}
