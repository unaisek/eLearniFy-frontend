import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmModalComponent } from './components/confirm-modal/confirm-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
// import { BrowserModule } from '@angular/platform-browser';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { VgCoreModule } from '@videogular/ngx-videogular/core';
import { VgControlsModule } from '@videogular/ngx-videogular/controls';
import { VgOverlayPlayModule } from '@videogular/ngx-videogular/overlay-play';
import { VgBufferingModule } from '@videogular/ngx-videogular/buffering';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
// import { VgScrubBarModule } from '@videogular/ngx-videogular/scrub-bar';
// import { VgMediaModule } from '@videogular/ngx-videogular/controls';
import { TimeagoModule } from 'ngx-timeago';
import { DialogModule } from 'primeng/dialog';
import { NgChartsModule } from 'ng2-charts';
// import { ChartsModule } from 'ng2-charts';





@NgModule({
  declarations: [ConfirmModalComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    // BrowserModule,
    // BrowserAnimationsModule,
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    TimeagoModule
  ],
  exports: [
    // BrowserModule,
    // BrowserAnimationsModule,
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    TimeagoModule,
    DialogModule,
    NgChartsModule
  ],
})
export class SharedModule {}
