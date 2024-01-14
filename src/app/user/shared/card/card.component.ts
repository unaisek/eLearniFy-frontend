import { Component,Input } from '@angular/core';
import { ICourse } from '../../../tutor/models/ICourse';


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent  {

  @Input('course')
  course:ICourse 
  @Input('enrolled')
  enrolled:boolean = false;

}
