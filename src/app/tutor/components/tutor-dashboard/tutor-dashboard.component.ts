import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../services/course.service';
import { ToastrService } from 'ngx-toastr';
import { ConfirmModalService } from 'src/app/shared/services/confirm-modal.service';

@Component({
  selector: 'app-tutor-dashboard',
  templateUrl: './tutor-dashboard.component.html',
  styleUrls: ['./tutor-dashboard.component.css']
})
export class TutorDashboardComponent implements OnInit {

  myCourses = []
  constructor(
    private _courseService:CourseService,
    private _toastr:ToastrService,
    private _dialogService:ConfirmModalService
  ){

  }

  ngOnInit(): void {
    this.getMyAllCourses();
  }

  getMyAllCourses(){
    this._courseService.getAllMyCourses()
    .subscribe((res)=>{
      this.myCourses = res      
    })
  }

  unList(courseId:string){
  //  
    this._dialogService.confirmModal({
      title:"Please confirm action",
      message:"Are you sure want to unlist the course!",
      confirmText:"Confirm",
      cancelText:"Cancel"
    }).subscribe((confirmed :boolean)=>{
      console.log(confirmed,"confirm");
      
      if(confirmed){
          this._courseService.unListCourse(courseId).subscribe((res)=>{
          this._toastr.success("course Unlisted");
          this.getMyAllCourses();
        })
      }
    })
  }

  list(courseId:string){
    this._dialogService
      .confirmModal({
        title: 'Please confirm action',
        message: 'Are you sure want to list the course!',
        confirmText: 'Confirm',
        cancelText: 'Cancel',
      })
      .subscribe((confirmed: boolean) => {
        if (confirmed) {
          this._courseService.listCourse(courseId).subscribe({
            next:(res)=>{
              this._toastr.success("Course Listed");
              this.getMyAllCourses();
            },
            error:(error)=>{
              this._toastr.error("course listing failed");
              console.log(error);
            }
          })
        }
      });
  }

}
