import { Component, Input } from '@angular/core';
import { ICourse } from '../../../tutor/models/ICourse';

@Component({
  selector: 'app-user-chapter',
  templateUrl: './user-chapter.component.html',
  styleUrls: ['./user-chapter.component.css']
})
export class UserChapterComponent {

  @Input('courseData')
  courseData:ICourse

}
