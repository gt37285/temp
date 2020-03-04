import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { URL_SERVICES } from '../config/config';

@Pipe({
  name: 'archivos'
})
export class ArchivosPipe implements PipeTransform {

  constructor(
    private _domSanitizer: DomSanitizer
  ) { }

  transform(nombre: any, tipo: string) {

    let url = `${URL_SERVICES}/aula/archivo/${tipo}/${nombre}`

    console.log(url)

    return this._domSanitizer.bypassSecurityTrustResourceUrl(url);
  }

}
