import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TutorRoutingModule } from './tutor-routing.module';
import { TutorHomeComponent } from './components/tutor-home/tutor-home.component';
import { TutorDashboardComponent } from './components/tutor-dashboard/tutor-dashboard.component';
import { NewCourseComponent } from './components/new-course/new-course.component';
import { TutorLayoutComponent } from './components/tutor-layout/tutor-layout.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { MatIconModule, } from '@angular/material/icon';
import { TutorMenuComponent } from './shared/tutor-menu/tutor-menu.component';
import { TutorHeaderComponent } from './shared/tutor-header/tutor-header.component';
import { TutorProfileComponent } from './shared/tutor-profile/tutor-profile.component';




@NgModule({
  declarations: [
    TutorHomeComponent,
    TutorDashboardComponent,
    NewCourseComponent,
    TutorLayoutComponent,
    TutorMenuComponent,
    TutorHeaderComponent,
    TutorProfileComponent,
  ],
  imports: [
    CommonModule,
    TutorRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatIconModule
  ],
})
export class TutorModule {}
