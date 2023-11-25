import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TutorRoutingModule } from './tutor-routing.module';
import { TutorHomeComponent } from './components/tutor-home/tutor-home.component';




@NgModule({
  declarations: [
    TutorHomeComponent
  ],
  imports: [
    CommonModule,
    TutorRoutingModule
  ]
})
export class TutorModule { }
