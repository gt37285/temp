import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'telefono'
})
export class TelefonoPipe implements PipeTransform {

  transform(value: any): any {

    let res = value

    if (!res) {
      res = 'No definido'
    }

    return res;
  }

}
