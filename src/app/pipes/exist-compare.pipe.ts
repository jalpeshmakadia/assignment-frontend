import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'existCompare'
})

export class ExistCompare implements PipeTransform {
  transform(id: any, compareValue: Array<any>): any {
    const found = compareValue.find((element) => {
      return element.id === id;
    });
    return found;
  }
}
