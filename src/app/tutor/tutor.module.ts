import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TutorRoutingModule } from './tutor-routing.module';
import { HomeComponent } from './home/home.component';
import { TutorHomeComponent } from './components/tutor-home/tutor-home.component';



@NgModule({
  declarations: [
    HomeComponent,
    TutorHomeComponent
  ],
  imports: [
    CommonModule,
    TutorRoutingModule
  ]
})
export class TutorModule { }
