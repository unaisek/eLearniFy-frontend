import { NgModule } from '@angular/core';
import { Routes,RouterModule } from '@angular/router';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { AdminHomeComponent } from './components/admin-home/admin-home.component';
import { adminGuard } from '../core/guards/admin.guard';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UsersComponent } from './components/users/users.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { CouponComponent } from './components/coupon/coupon.component';

const routes: Routes = [
  {path:'',component:AdminHomeComponent, canActivate:[adminGuard],
    children:[
      {path:'', redirectTo:'dashboard',pathMatch:'full'},
      {path:'dashboard', component: DashboardComponent},
      { path:'users-list', component:UsersComponent },
      { path:'categories', component: CategoriesComponent },
      { path:'coupons', component: CouponComponent}
    ]
  },
  {path:'login', component:AdminLoginComponent}
]

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
