import { Injectable } from '@angular/core';
import { UsuariosService } from './usuarios.service';
import { URL_SERVICES } from '../config/config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { ModulesModel } from '../models/clases/modulos.model';
import Swal from "sweetalert2";

@Injectable({
  providedIn: 'root'
})
export class ModuloProfService {

  constructor(
    private _userService: UsuariosService,
    private _http: HttpClient
  ) { }


  cargarModulos(id: string) {

    let url = `${URL_SERVICES}/aula/curso/modulo/${id}`;

    return this._http
      .get(url, { headers: this._userService.cargarHeaders() })
      .pipe(
        map((data: any) => data),
        catchError(err => {

          return Swal.fire({
            title: "Completado!",
            text: err.error.message,
            icon: "warning",
            confirmButtonText: "Cool"
          });

        })
      );
  }


  crearModulo(modulo: ModulesModel, id_curso: string) {
    let url = `${URL_SERVICES}/aula/curso/modulo/${id_curso}`;

    return this._http
      .post(url, modulo, { headers: this._userService.cargarHeaders() })
      .pipe(
        map((data: any) => data.message),
        catchError(err => {

          return Swal.fire({
            title: "Completado!",
            text: err.error.message,
            icon: "warning",
            confirmButtonText: "Cool"
          });

        })
      );
  }


  eliminarModulo(modulo: ModulesModel, id_curso: string) {

    let url = `${URL_SERVICES}/aula/curso/modulo/${id_curso}`;

    let headers = new HttpHeaders({
      token: this._userService.token,
      modulo: modulo._id
    })

    return this._http
      .delete(url, { headers })
      .pipe(
        map((data: any) => data.message),
        catchError(err => {

          return Swal.fire({
            title: "Completado!",
            text: err.error.message,
            icon: "warning",
            confirmButtonText: "Cool"
          });

        })
      );
  }

  actualizarModulo(modulo: ModulesModel, id_curso: string) {
    let url = `${URL_SERVICES}/aula/curso/modulo/${id_curso}`;

    return this._http
      .put(url, modulo, { headers: this._userService.cargarHeaders() })
      .pipe(
        map((data: any) => data.message),
        catchError(err => {

          return Swal.fire({
            title: "Completado!",
            text: err.error.message,
            icon: "warning",
            confirmButtonText: "Cool"
          });

        })
      );
  }
}
