import { Component, OnInit } from '@angular/core';
import { ICourse } from '../../../tutor/models/ICourse';
import { UserCourseService } from '../../services/user-course.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  courseLists:ICourse[];
  constructor(
    private _userCourseServie:UserCourseService,
  ) {
    
  }
  ngOnInit(): void {
    this.getCourseList();
  }

  getCourseList(){
    this._userCourseServie.getAllCoursesForStudentHome().subscribe({
      next:(response)=>{
        console.log(response);
        
        this.courseLists = response;
        console.log(this.courseLists,"course");
        
      },
      error:(error)=>{
        console.log(error);
        
      }
    })
  }
}
