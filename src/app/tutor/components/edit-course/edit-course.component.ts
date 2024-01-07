import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ICategory } from '../../models/ICategory';
import { TutorService } from '../../services/tutor.service';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from '../../services/course.service';
import { IChapter, ICourse } from '../../models/ICourse';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { ConfirmModalService } from 'src/app/shared/services/confirm-modal.service';

@Component({
  selector: 'app-edit-course',
  templateUrl: './edit-course.component.html',
  styleUrls: ['./edit-course.component.css'],
})
export class EditCourseComponent implements OnInit {
  editCourseForm: FormGroup;
  courseId: string;
  categoryList: ICategory[];
  courseDetails;
  loading: boolean = false;
  thumbnailImage: File = null;
  courseIntroVideo: File = null;
  showModal: boolean = false;
  chapterDetails: { chapter: IChapter; order: number } | null;

  constructor(
    private _fb: FormBuilder,
    private _tutorService: TutorService,
    private _route: ActivatedRoute,
    private _courseService: CourseService,
    private _toastr: ToastrService,
    private _dialogService: ConfirmModalService
  ) {}

  ngOnInit(): void {
    this.editCourseForm = this._fb.group({
      title: ['', Validators.required],
      category: ['', Validators.required],
      level: ['', Validators.required],
      courseType: ['', Validators.required],
      price: ['', Validators.required],
      description: ['', Validators.required],
      thumbnail: [''],
      introductionVideo: [''],
    });

    this.getCategoryList();
    this.getCourseDetails();
  }

  getCategoryList() {
    this._tutorService.categoryList$.subscribe((res) => {
      this.categoryList = res;
    });
  }

  getCourseDetails() {
    this.courseId = this._route.snapshot.paramMap.get('id');
    this._courseService.getCourseDetails(this.courseId);
    this._courseService.courseDetails$.subscribe((res) => {
      this.courseDetails = res;
      console.log(res, 'respones');

      this.setCourseFormValue();
    });
  }
  setCourseFormValue() {
    if (this.courseDetails) {
      this.editCourseForm.patchValue({
        title: this.courseDetails.title,
        category: this.courseDetails.category._id,
        level: this.courseDetails.level,
        courseType: this.courseDetails.courseType,
        price: this.courseDetails.price,
        description: this.courseDetails.description,
      });
    }
  }
  onCourseTypeChange(event: Event): void {
    const courseTypeControl = this.editCourseForm.get('courseType');
    if (courseTypeControl.value === 'free') {
      this.editCourseForm.get('price')?.setValue(0);
      this.editCourseForm.get('price')?.disable();
    } else {
      this.editCourseForm.get('price')?.enable();
      // this.courseForm.get('price')?.setValue('')
    }
  }
  onFileChangeImage(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    this.thumbnailImage = fileInput.files[0];
  }

  onFileChangeIntroVideo(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    this.courseIntroVideo = fileInput.files[0];
  }

  submitEditCourse() {
    const formValues = this.editCourseForm.value;
    const formData = new FormData();

    Object.keys(formValues).forEach((key) => {
      if (key !== 'thumbnail' && key !== 'introductionVideo')
        if (formValues[key] !== null || formValues[key] !== '') {
          formData.append(key, formValues[key]);
        }
    });

    if (this.thumbnailImage) {
      formData.append(
        'thumbnail',
        this.thumbnailImage,
        this.thumbnailImage.name
      );
    } else {
      formData.append('thumbnail', this.courseDetails.thumbnail);
    }

    if (this.courseIntroVideo) {
      formData.append(
        'introductionVideo',
        this.courseIntroVideo,
        this.courseIntroVideo.name
      );
    } else {
      formData.append(
        'introductionVideo',
        this.courseDetails.introductionVideo
      );
    }

    this._courseService.updateCourse(formData, this.courseId).subscribe({
      next: (res) => {
        this._toastr.success('Course Updated');
        this.getCourseDetails();
        //  window.location.reload();
      },
      error: (err) => {
        this._toastr.error('Course Updation Failed');
      },
    });
  }

  showChapterModal(chapterData) {
    this.showModal = true;
    this.chapterDetails = chapterData;
  }

  deleteChapter(courseId: string, chapterId: string) {
    this._dialogService
      .confirmModal({
        title: 'Please confirm action!',
        message: 'Are you sure want delete chapter!',
        confirmText: 'Confirm',
        cancelText: 'Cancel',
      })
      .subscribe((confirm) => {
        if (confirm) {
          this._courseService.deleteChapter(courseId, chapterId).subscribe({
            next: (res) => {
              this._toastr.success('Chapter Deleted succssfully!');
            },
            error: (error) => {
              this._toastr.error('chapter deletion failed');
              console.log(error);
            },
          });
        }
      });
  }

  onChapterUpdate() {
    this.getCourseDetails();
  }
}
