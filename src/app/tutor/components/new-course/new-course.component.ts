import { Component,OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TutorService } from '../../services/tutor.service';
import { CourseService } from '../../services/course.service';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { provideClientHydration } from '@angular/platform-browser';

@Component({
  selector: 'app-new-course',
  templateUrl: './new-course.component.html',
  styleUrls: ['./new-course.component.css'],
})
export class NewCourseComponent implements OnInit {
  courseForm: FormGroup;
  categories = [];
  thumbnailImage: File = null;
  courseIntroVideo: File = null;
  chapterVideo: File = null;
  chapterMaterial: File= null;


  constructor(
    private _fb: FormBuilder,
    private _tutorService: TutorService,
    private _courseService: CourseService,
    private _toastr: ToastrService
     ) {}

  ngOnInit(): void {
    this.courseForm = this._fb.group({
      title: ['', Validators.required],
      category: ['', Validators.required],
      level: ['', Validators.required],
      courseType: ['', Validators.required],
      price: [ '',Validators.required],
      description: ['', Validators.required],
      thumbnail: ['', Validators.required],
      introductionVideo: ['', Validators.required],
      chapterTitle: ['', Validators.required],
      chapterDescription: ['', Validators.required],
      chapterVideo: ['', Validators.required],
      chapterMaterial:['',Validators.required]
    });

    this.categoryList();

    
    
  }

  onCourseTypeChange(event: Event): void {
    const courseTypeControl = this.courseForm.get('courseType');
    if (courseTypeControl.value === 'free') {
      this.courseForm.get('price')?.setValue(0);
      this.courseForm.get('price')?.disable();
    } else {
      this.courseForm.get('price')?.enable();
      // this.courseForm.get('price')?.setValue('')
    }
  }

  // fetch course category
  categoryList() {
    this._tutorService.getCategory().subscribe((res) => {
      this.categories = res;
    });
  }

  get chapterForms() {
    return this.courseForm.get('chapters') as FormArray;
  }

  removeChapter(index: number) {
    this.chapterForms.removeAt(index);
  }

  onFileChangeImage(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    this.thumbnailImage = fileInput.files[0];
  }

  onFileChangeIntroVideo(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    this.courseIntroVideo = fileInput.files[0];
  }

  onChapterVideoChange(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    this.chapterVideo = fileInput.files[0];
  }

  onChapterMaterialChange(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    this.chapterMaterial= fileInput.files[0];
  }

  submitCourse() {
    const formData = new FormData();
    formData.append('title', this.courseForm.get('title')?.value);
    formData.append('category', this.courseForm.get('category')?.value);
    formData.append('level', this.courseForm.get('level')?.value);
    formData.append('courseType', this.courseForm.get('courseType')?.value);

    const value = this.courseForm.get('price')?.value;
    if(value){
      formData.append('price',value);
    } else {
      formData.append('price','0')
    }

    formData.append('description', this.courseForm.get('description')?.value);
    formData.append('thumbnail', this.thumbnailImage, this.thumbnailImage?.name || '');
    formData.append('introductionVideo', this.courseIntroVideo, this.courseIntroVideo?.name || '');

    formData.append('chapterTitle', this.courseForm.get('chapterTitle')?.value);
    formData.append(`chapterDescription`, this.courseForm.get('chapterDescription')?.value);
    formData.append(`chapterVideo`, this.chapterVideo, this.chapterVideo?.name || '');
    formData.append(`chapterMaterial`, this.chapterMaterial, this.chapterMaterial?.name || '')
    
    const tutorId = localStorage.getItem('user')
    formData.append('tutorId',tutorId)

    // send course form data to backend
    console.log(formData);
    
    this._courseService.addNewCourse(formData).subscribe({next:(res)=>{
      console.log("sucess",res);
      this._toastr.success("course added succesfully")
            
    },error:(err)=>{
      console.log(err.error.message);
      this._toastr.error("failed to course adding")      
    }})
    
  }
}
