import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { HomeComponent } from './components/home/home.component';
import { UserHeaderComponent } from './shared/user-header/user-header.component';
import { AllCoursesComponent } from './components/all-courses/all-courses.component';
import { ProgressComponent } from './components/progress/progress.component';
import { UserLayoutComponent } from './components/user-layout/user-layout.component';
import { UserMenuComponent } from './shared/user-menu/user-menu.component';
import { UserAuthLinksComponent } from './shared/user-auth-links/user-auth-links.component';
import { ButtonComponent } from './shared/button/button.component';
import { CardComponent } from './shared/card/card.component';
import { UserCourseViewComponent } from './components/user-course-view/user-course-view.component';
import { MatTabsModule } from '@angular/material/tabs';
import { UserChapterComponent } from './components/user-chapter/user-chapter.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { PaymentSuccessComponent } from './components/payment-success/payment-success.component';
import { EnrolledCourseViewComponent } from './components/enrolled-course-view/enrolled-course-view.component';
import { SharedModule } from '../shared/shared.module';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CourseFilterComponent } from './shared/course-filter/course-filter.component';
import { CheckboxModule } from 'primeng/checkbox';
import { NgxStarsModule } from 'ngx-stars';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    HomeComponent,
    UserHeaderComponent,
    AllCoursesComponent,
    ProgressComponent,
    UserLayoutComponent,
    UserMenuComponent,
    UserAuthLinksComponent,
    ButtonComponent,
    CardComponent,
    UserCourseViewComponent,
    UserChapterComponent,
    UserProfileComponent,
    PaymentSuccessComponent,
    EnrolledCourseViewComponent,
    CourseFilterComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    MatTabsModule,
    SharedModule,
    MatProgressBarModule,
    CheckboxModule,
    NgxStarsModule,
    ReactiveFormsModule
  ]
})
export class UserModule { }
