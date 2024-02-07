import { Component,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from '../../services/course.service';
import { IChapter, ICourse } from '../../models/ICourse';
import { IReview } from '../../../models/IReview'

@Component({
  selector: 'app-view-course',
  templateUrl: './view-course.component.html',
  styleUrls: ['./view-course.component.css'],
})
export class ViewCourseComponent implements OnInit {
  courseData: ICourse;
  currentChapter: IChapter;
  reviewsArray: IReview[];

  constructor(
    private _route: ActivatedRoute,
    private _courseService: CourseService
  ) {}

  ngOnInit(): void {
    this.getCourseDetails();
  }

  getCourseDetails() {
    const courseId = this._route.snapshot.paramMap.get('id');
    this._courseService.getCourseDetails(courseId);
    this._courseService.courseDetails$.subscribe((res) => {
      this.courseData = res;
      console.log(this.courseData, 'courseData');
       if (this.courseData?.chapters.length) {
         this.playChapter(this.courseData?.chapters[0].chapter);
       }
    });
  }
  playChapter(chapter: IChapter) {
    this.currentChapter = chapter;
  }
}
