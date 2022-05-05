import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'index'
})
export class IndexPipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): number {
    return 2**value;
  }

}
