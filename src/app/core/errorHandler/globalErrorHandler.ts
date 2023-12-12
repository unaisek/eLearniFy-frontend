import { Injectable, ErrorHandler } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  constructor() {}

  handleError(error: any): void {
    console.error('An error occurred:', error);
    // Perform additional actions like logging or displaying an error message to the user
    // this._toastr.error("error occured ")
  }
}
