import { Injectable } from '@angular/core';
import { ModulesModel } from '../models/clases/modulos.model';
import { URL_SERVICES } from '../config/config';
import { UsuariosService } from './usuarios.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { claseModel } from '../models/clases/clase.model';

@Injectable({
  providedIn: 'root'
})
export class ClasesProfService {

  constructor(
    private _userService: UsuariosService,
    private _http: HttpClient
  ) { }


  cargarClases(id_modulo: string, id_curso: string) {

    let url = `${URL_SERVICES}/aula/curso/clase/${id_curso}/${id_modulo}`;

    return this._http
      .get(url, { headers: this._userService.cargarHeaders() })
      .pipe(
        map(data => data)
      );
  }

  crearClase(clase: claseModel, id_curso: string) {
    let url = `${URL_SERVICES}/aula/curso/clase/${id_curso}`;

    return this._http
      .post(url, clase, { headers: this._userService.cargarHeaders() })
      .pipe(
        map((data: any) => data.message)
      );
  }

  eliminarClase(id_clase: string, id_modulo: string, id_curso: string) {

    let url = `${URL_SERVICES}/aula/curso/clase/${id_curso}/${id_modulo}/${id_clase}`;

    return this._http
      .delete(url, { headers: this._userService.cargarHeaders() })
      .pipe(
        map((data: any) => data.message)
      );
  }

  actualizarClase(clase: claseModel, id_curso: string) {

    let url = `${URL_SERVICES}/aula/curso/clase/${id_curso}`;

    return this._http
      .put(url, clase, { headers: this._userService.cargarHeaders() })
      .pipe(
        map((data: any) => data.message)
      );
  }
}
