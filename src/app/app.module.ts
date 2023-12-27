import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ButtonComponent } from './user/shared/button/button.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from "@angular/common/http";
import { OtpComponent } from './auth/otp/otp.component';
import { NgOtpInputModule } from 'ng-otp-input';
import { UserModule } from './user/user.module';
import { TutorModule } from './tutor/tutor.module';
import { AdminModule } from './admin/admin.module';
import { TimeFormatPipe } from './core/pipes/time-format.pipe';
import { GlobalErrorHandler } from './core/errorHandler/globalErrorHandler';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    OtpComponent,
    TimeFormatPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatIconModule,
    ToastrModule.forRoot(),
    HttpClientModule,
    NgOtpInputModule,
    UserModule,
    TutorModule,
    AdminModule,
    SharedModule

  ],
  providers: [{provide: ErrorHandler, useClass: GlobalErrorHandler}],
  bootstrap: [AppComponent]
})
export class AppModule { }
