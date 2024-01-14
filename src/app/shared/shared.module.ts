import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmModalComponent } from './components/confirm-modal/confirm-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { VgCoreModule } from '@videogular/ngx-videogular/core';
import { VgControlsModule } from '@videogular/ngx-videogular/controls';
import { VgOverlayPlayModule } from '@videogular/ngx-videogular/overlay-play';
import { VgBufferingModule } from '@videogular/ngx-videogular/buffering';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TimeagoModule } from 'ngx-timeago';
import { DialogModule } from 'primeng/dialog';
import { NgChartsModule } from 'ng2-charts';
import { NoEmptySpacesDirective } from './directives/no-empty-spaces.directive';
// import { ChartsModule } from 'ng2-charts';





@NgModule({
  declarations: [ConfirmModalComponent, NoEmptySpacesDirective],
  imports: [
    CommonModule,
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
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
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    TimeagoModule,
    DialogModule,
    NgChartsModule,
    NoEmptySpacesDirective
  ],
})
export class SharedModule {}
