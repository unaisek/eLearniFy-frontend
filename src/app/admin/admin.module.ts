import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminHomeComponent } from './components/admin-home/admin-home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { UsersComponent } from './components/users/users.component';
import { CategoriesComponent } from './components/categories/categories.component';



@NgModule({
  declarations: [
    AdminLoginComponent,
    AdminHomeComponent,
    DashboardComponent,
    SidebarComponent,
    NavbarComponent,
    UsersComponent,
    CategoriesComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatIconModule,
    ReactiveFormsModule
  ]
})
export class AdminModule { }
