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



@NgModule({
  declarations: [
    HomeComponent,
    UserHeaderComponent,
    AllCoursesComponent,
    ProgressComponent,
    UserLayoutComponent,
    UserMenuComponent,
    UserAuthLinksComponent,
    ButtonComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule
  ]
})
export class UserModule { }
