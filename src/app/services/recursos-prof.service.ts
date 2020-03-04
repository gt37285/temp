import { Injectable } from '@angular/core';
import { URL_SERVICES } from '../config/config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UsuariosService } from './usuarios.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RecursosProfService {

  constructor(
    private _http: HttpClient,
    private _userService: UsuariosService
  ) { }


  cargarRecursos(id_curso: string, id_modulo: string) {

    let url = `${URL_SERVICES}/aula/archivo/recursos/${id_curso}/${id_modulo}`;

    return this._http
      .get(url, { headers: this._userService.cargarHeaders() })
  }



  async subirArchivo(archivo: File, tipo: String, id_modulo: string, id_curso: string) {
    return new Promise((resolve, reject) => {
      let url = `${URL_SERVICES}/aula/archivo/${tipo}/${id_curso}/${id_modulo}`;

      let formData = new FormData();
      formData.append("archivo", archivo, archivo.name);

      let peticion = new XMLHttpRequest();

      peticion.open("POST", url, true);

      peticion.addEventListener("load", () => {
        if (peticion.status == 200 && peticion.readyState == 4) {
          resolve(JSON.parse(peticion.response));
        } else {
          reject(JSON.parse(peticion.response));
        }
      });

      peticion.withCredentials = true

      peticion.setRequestHeader('token', this._userService.token)
      peticion.send(formData);
    });
  }

  aliminarRecurso(id_modulo: string, id_recurso: string, id_curso: string) {

    let url = `${URL_SERVICES}/aula/archivo/recursos/${id_curso}/${id_modulo}/${id_recurso}`;

    return this._http
      .delete(url, { headers: this._userService.cargarHeaders() })
  }

  descargar(nombre: string) {
    let url = `${URL_SERVICES}/aula/descarga/recursos/${nombre}`;

    let headers = new HttpHeaders({
      token: this._userService.token
    })

    return this._http
      .get(url, { headers })
  }
}
