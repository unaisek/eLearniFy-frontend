import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';
import { FormControl, NG_VALIDATORS } from '@angular/forms';

@Directive({
  selector: '[appNoEmptySpaces]',
  providers:[{
    provide:NG_VALIDATORS, useExisting: NoEmptySpacesDirective ,multi: true
  }]
})
export class NoEmptySpacesDirective {

  @Input() emptySpaceValidate: string = ''

  constructor(
    private _elem: ElementRef,
    private _renderer: Renderer2
  ) { }

  validate(cotrol: FormControl): {[key: string]: any} | null {
    const value = cotrol. value;
    if(value && value.trim()== ''){
      return {'noEmptySpace': true}
    }
    return null
  } 

}
