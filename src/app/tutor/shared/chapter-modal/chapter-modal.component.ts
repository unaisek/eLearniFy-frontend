import { Component, OnInit,Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IChapter } from '../../models/ICourse';
import { CourseService } from '../../services/course.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-chapter-modal',
  templateUrl: './chapter-modal.component.html',
  styleUrls: ['./chapter-modal.component.css'],
})
export class ChapterModalComponent implements OnInit, OnChanges {
  @Input('show')
  show: boolean = false;

  @Input('chapterDetails')
  chapterDetails: { chapter: IChapter; order: number } | null;

  @Input('courseTitle')
  courseTitle: string;

  @Output('close')
  onclose = new EventEmitter();

  @Output() chapterUpdated: EventEmitter<void> = new EventEmitter<void>();

  buttonChange: string;
  chapterForm: FormGroup;
  chapterVideoFile: File = null;
  chapterMaterialFile: File = null;
  loading:boolean = false

  constructor(
    private _fb: FormBuilder,
    private _courseService: CourseService,
    private _toastr: ToastrService,
    private _route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.chapterForm = this._fb.group({
      chapterTitle: ['', Validators.required],
      chapterDescription: ['', Validators.required],
      chapterVideo: ['', Validators.required],
      chapterMaterial: ['', Validators.required],
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('chapterDetails' in changes) {
      if (this.chapterDetails) {
        this.buttonChange = 'Update Chapter';
        this.setChapterFormValues();
      } else {
        this.buttonChange = 'Add Chapter';
        if (this.chapterForm) {
          this.chapterForm.reset();
        }
      }
    }
  }

  setChapterFormValues() {
    const chapter = this.chapterDetails?.chapter;
    this.chapterForm.patchValue({
      chapterTitle: chapter.chapterTitle,
      chapterDescription: chapter.chapterDescription,
    });
  }

  modalClose() {
    if (this.chapterForm) {
      this.chapterForm.reset();
    }
    this.onclose.emit();
  }

  onChapterVideoChange(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    this.chapterVideoFile = fileInput.files[0];
  }
  onChapterMaterialChange(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    this.chapterMaterialFile = fileInput.files[0];
  }

  submitChapter() {
    this.loading = true
    const formData = new FormData();
    formData.append(
      'chapterTitle',
      this.chapterForm.get('chapterTitle')?.value
    );
    formData.append(
      'chapterDescription',
      this.chapterForm.get('chapterDescription')?.value
    );
    formData.append('courseTitle', this.courseTitle);

    if (this.chapterVideoFile) {
      formData.append('chapterVideo', this.chapterVideoFile);
    } else {
      formData.append('chapterVideo', this.chapterDetails.chapter.chapterVideo);
    }

    if (this.chapterVideoFile) {
      formData.append('chapterMaterial', this.chapterMaterialFile);
    } else {
      formData.append(
        'chapterMaterial',
        this.chapterDetails.chapter.chapterMaterial
      );
    }

    if (this.chapterDetails) {
      const chapterId: string = this.chapterDetails.chapter._id;

      this._courseService.updateChapter(chapterId, formData).subscribe({
        next: (res) => {
          this._toastr.success('chapter updated successfully');
          this.loading = false
          this.chapterUpdated.emit();
          this.onclose.emit();
        },
        error: (err) => {
          console.log(err);
        },
      });
    } else {
      const courseId = this._route.snapshot.paramMap.get('id');
      this._courseService.addNewChapter(formData, courseId).subscribe({
        next: (res) => {
          this._toastr.success('chapter Added');
          this.loading = false;
          this.onclose.emit();
          this.chapterUpdated.emit();

        },
        error: (error) => {
          console.log(error);
        },
      });
    }
  }
}
