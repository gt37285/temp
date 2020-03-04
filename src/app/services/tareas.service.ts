import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICES } from '../config/config';
import { UsuariosService } from './usuarios.service';
import { map, catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})

export class TareasService {

  constructor(
    private _http: HttpClient,
    private _userService: UsuariosService
  ) { }

  cargarTareaPorUsuario(id_usuario: string) {

    let url = `${URL_SERVICES}/aula/tareas/usuario/${id_usuario}`

    return this._http.get(url, { headers: this._userService.cargarHeaders() })
      .pipe(
        map((data: any) => data.tareas)
      )
  }

  cargarTareaPorCurso(id_curso: string) {
    let url = `${URL_SERVICES}/aula/tareas/curso/${id_curso}`

    return this._http.get(url, { headers: this._userService.cargarHeaders() })
      .pipe(
        map((data: any) => {
          return data.tareas
        })
      )
  }

  cargarTareaPorid(id_tarea: string) {
    let url = `${URL_SERVICES}/aula/tareas/${id_tarea}`

    return this._http.get(url, { headers: this._userService.cargarHeaders() })
      .pipe(
        map((data: any) => data)
      )
  }


  actualizarTarea(tarea: any) {
    let url = `${URL_SERVICES}/aula/tareas/${tarea._id}`

    return this._http.put(url, tarea, { headers: this._userService.cargarHeaders() })
      .pipe(
        map((data: any) => data.message),
        catchError((err) => {
          return Swal.fire({
            title: 'Error!',
            text: err.error.message,
            icon: 'error'
          })
        })
      )
  }

  eliminarTarea(id_tarea: string) {
    let url = `${URL_SERVICES}/aula/tareas/${id_tarea}`

    return this._http.delete(url, { headers: this._userService.cargarHeaders() })
      .pipe(
        map((data: any) => data.message),
        catchError((err) => {
          return Swal.fire({
            title: 'Error!',
            text: err.error.message
          })
        })
      )
  }

  agregarTarea(tarea: any, id_curso: string) {
    let url = `${URL_SERVICES}/aula/tarea/${id_curso}`

    return this._http.post(url, tarea, { headers: this._userService.cargarHeaders() })
      .pipe(
        map((data: any) => data.message),
        catchError((err) => {
          return Swal.fire({
            title: 'Error!',
            text: err.error.message
          })
        })
      )
  }



}
