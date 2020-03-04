import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { URL_SERVICES } from '../config/config';

@Pipe({
  name: 'descarga'
})

export class DescargaPipe implements PipeTransform {

  constructor(
    private _domSanitizer: DomSanitizer
  ) { }

  transform(nombre: any, tipo: string, id_tarea?: string) {

    let url = ``


    if (tipo == 'recursos') {
      url = `${URL_SERVICES}/aula/descarga/${nombre}`
    }

    if (tipo == 'tareas') {
      url = `${URL_SERVICES}/aula/descarga/${id_tarea}/${nombre}`
    }

    return this._domSanitizer.bypassSecurityTrustResourceUrl(url);
  }


}
