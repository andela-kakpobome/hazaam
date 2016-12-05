import { Pipe, PipeTransform } from '@angular/core';

/**
 * Transform an object into an array containing the keys of that object
 */
@Pipe({name: 'pluckKeys'})
export class PluckKeysPipe implements PipeTransform {
  transform(value: any, args: any[]): any {
    if(!value) return value;

    return Object.keys(value);
  }
}
