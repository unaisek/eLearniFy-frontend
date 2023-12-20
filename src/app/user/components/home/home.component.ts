import { Component, OnInit } from '@angular/core';
import { ICourse } from 'src/app/tutor/models/ICourse';
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
    this._userCourseServie.getAllCoursesForStudent().subscribe({
      next:(cousres)=>{
        this.courseLists = cousres;
        console.log(this.courseLists);
        
      },
      error:(error)=>{
        console.log(error);
        
      }
    })
  }
}
