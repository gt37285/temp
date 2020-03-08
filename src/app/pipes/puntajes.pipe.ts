import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'puntajes'
})

export class PuntajesPipe implements PipeTransform {

  transform(value: any): any {
    let puntaje = Number(value)
    return puntaje.toFixed(2);
  }

}
