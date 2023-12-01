import { Component, OnInit,Input, } from '@angular/core';


@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent implements OnInit {

  @Input('size')
  size ='small'; //small,large,medium

  @Input('shade')
  shade = "white"; //white,dark,light,NA

  @Input('animation')
  animation ="fade" //circle,fade

  @Input('name')
  name ='';

  ngOnInit(): void {
    
  }

}
