import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'pluckKeys'})
export class PluckKeysPipe implements PipeTransform {
  transform(value: any, args: any[]): any {
    if(!value) return value;

    return Object.keys(value.rows);
  }
}
