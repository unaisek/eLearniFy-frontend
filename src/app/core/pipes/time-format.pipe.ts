import { Pipe, PipeTransform } from '@angular/core';
import { Stringifier } from 'postcss';

@Pipe({
  name: 'timeFormat'
})
export class TimeFormatPipe implements PipeTransform {

  transform(value: number): string {
    const minutes:number = Math.floor(value / 60);
    const seconds:number = value - minutes * 60;

    const formattedMinutes:string = String(minutes).padStart(2,'0');
    const formattedSeconds: string = String(seconds).padStart(2,'0')

    return `${formattedMinutes}:${formattedSeconds}`
  }

}
