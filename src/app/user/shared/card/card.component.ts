import { Component,Input } from '@angular/core';
import { ICourse } from 'src/app/tutor/models/ICourse';


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent  {

  @Input('course')
  course:ICourse 

}
