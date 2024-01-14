import { Component, OnInit } from '@angular/core';
import { UserCourseService } from '../../services/user-course.service';
import { IEnrolledCourse } from '../../../models/IEnrolledCourse';
import { ConfirmModalService } from '../../../shared/services/confirm-modal.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.css'],
})
export class ProgressComponent implements OnInit {
  courseData: IEnrolledCourse[];
  ratingModal: boolean = false;
  ratedValue: number;
  reviewForm: FormGroup;
  ratingCourseId: string;
  checkRated:boolean = false

  constructor(
    private _userCourseService: UserCourseService,
    private _conirmModalService: ConfirmModalService,
    private _toastrService: ToastrService,
    private _fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.reviewForm = this._fb.group({
      rating: [0, Validators.required],
      review:['',Validators.required],
    });
    this.getEnrolledCourses();
  }

  getEnrolledCourses() {
    const userId = localStorage.getItem('user');
    this._userCourseService.getEnrolledCourses(userId).subscribe({
      next: (res) => {
        this.courseData = res;
      },
    });
  }

  isCourseExpired(date: string): boolean {
    const courseCreatedDate = new Date(date);
    const currentDate = new Date();
    const differenceInTime =
      currentDate.getTime() - courseCreatedDate.getTime();
    const differenceInDays = differenceInTime / (1000 * 3600 * 24);
    return differenceInDays <= 15;
  }

  cancelCourse(courseId: string) {
    this._conirmModalService
      .confirmModal({
        title: 'Please confirm action',
        message: 'Are you sure want cancel this Course.?',
        confirmText: 'Yes',
        cancelText: 'No',
      })
      .subscribe((confirm) => {
        if (confirm) {
          this._userCourseService
            .cancelEnrolledCourse(courseId)
            .subscribe((res) => {
              console.log(res);
              this._toastrService.success('Course Cancelled');
              this.getEnrolledCourses();
            });
        }
      });
  }

  calculateProgression(course: IEnrolledCourse): number {
    const totalChapter = course.courseId.chapters.length;
    const completeChapter = course.progression.length;

    const percentage = Math.floor((completeChapter / totalChapter) * 100);
    return percentage;
  }

  openRatingModal(courseId: string) {
    this.ratingModal = true;
    this.ratingCourseId = courseId;
  }

  onRatingSet(rating: number) {
    const ratingControl = this.reviewForm.get('rating') as FormControl;
    ratingControl.setValue(rating);
  }

  submitReviwCourse() {
    const value = this.reviewForm.getRawValue();
    console.log(value);

    const courseId = this.ratingCourseId;
    const userId = localStorage.getItem('user');
    this._userCourseService.addReview(courseId, userId, value).subscribe({
      next: (reveiw) => {
        this._toastrService.success('Rating Added');
        this.ratingModal = false;
        this.checkRated = true
        
      },
    });
  }
}
