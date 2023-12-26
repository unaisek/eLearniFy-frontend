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
import { ViewCourseComponent } from './components/view-course/view-course.component';
import { TutorCardComponent } from './shared/tutor-card/tutor-card.component';
import { EditCourseComponent } from './components/edit-course/edit-course.component';
import { ChapterModalComponent } from './shared/chapter-modal/chapter-modal.component';
import { TutorProfileViewComponent } from './components/tutor-profile-view/tutor-profile-view.component';




@NgModule({
  declarations: [
    TutorHomeComponent,
    TutorDashboardComponent,
    NewCourseComponent,
    TutorLayoutComponent,
    TutorMenuComponent,
    TutorHeaderComponent,
    TutorProfileComponent,
    ViewCourseComponent,
    TutorCardComponent,
    EditCourseComponent,
    ChapterModalComponent,
    TutorProfileViewComponent,
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
