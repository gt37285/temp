import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuariosService } from './usuarios.service';
import { URL_SERVICES } from '../config/config';
import { map, catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs/internal/Observable';
import { matriculaModel } from '../models/cursos/matricula.model';

@Injectable({
  providedIn: 'root'
})
export class MatriculaService {

  constructor(
    private _http: HttpClient,
    private _userService: UsuariosService
  ) { }

  /**
   * 
   * @param matriculas
   * 
   * el metodo de verificar matricula y agregar matricula a los pendientes
   * se encuentran en el servicio de cursos
   * 
   */


  listarMatriculasPendientes(id_curso: string) {
    let url = `${URL_SERVICES}/aula/cursos/matricula/pendientes/${id_curso}`

    return this._http.get(url, { headers: this._userService.cargarHeaders() })
      .pipe(
        map((data: any) => data.data.matricula),
        catchError((err: any) => {
          console.log(err);
          Swal.fire({
            title: "Error en la peticion!",
            text: err.error.message,
            icon: "error",
            confirmButtonText: "Cool"
          });
          return Observable.throw(err)
        })
      )
  }


  rechazarMatricula(id_curso: string, id_matricula: string) {
    let url = `${URL_SERVICES}/aula/cursos/matricula/pendientes/${id_curso}/${id_matricula}`

    return this._http.delete(url, { headers: this._userService.cargarHeaders() })
      .pipe(
        map((data: any) => data),
        catchError((err: any) => {
          console.log(err);
          Swal.fire({
            title: "Error en la peticion!",
            text: err.error.message,
            icon: "error",
            confirmButtonText: "Cool"
          });
          return Observable.throw(err)
        })
      )
  }

  aceptarMatricula(matricula: matriculaModel, id_curso:string) {
    

    let url = `${URL_SERVICES}/aula/cursos/matricula/estudiantes/${id_curso}`

    let registro = {
      matricula: matricula._id
    }

    return this._http.put(url, registro, { headers: this._userService.cargarHeaders() })
      .pipe(
        map((data: any) => data),
        catchError((err: any) => {
          console.log(err);
          Swal.fire({
            title: "Error en la peticion!",
            text: err.error.message,
            icon: "error",
            confirmButtonText: "Cool"
          });
          return Observable.throw(err)
        })
      )
  }


  listarMatriculasRechazadas(id_curso: string) {
    let url = `${URL_SERVICES}/aula/cursos/matricula/rechazados/${id_curso}`

    return this._http.get(url, { headers: this._userService.cargarHeaders() })
      .pipe(
        map((data: any) => data.data.rechazados),
        catchError((err: any) => {
          console.log(err);
          Swal.fire({
            title: "Error en la peticion!",
            text: err.error.message,
            icon: "error",
            confirmButtonText: "Cool"
          });
          return Observable.throw(err)
        })
      )
  }

  aceptarRechazados(matricula: matriculaModel, id_curso: string) {

    let url = `${URL_SERVICES}/aula/cursos/matricula/rechazados/${id_curso}`

    let registro = {
      matricula: matricula._id
    }

    return this._http.put(url, registro, { headers: this._userService.cargarHeaders() })
      .pipe(
        map((data: any) => data),
        catchError((err: any) => {
          console.log(err);
          Swal.fire({
            title: "Error en la peticion!",
            text: err.error.message,
            icon: "error",
            confirmButtonText: "Cool"
          });
          return Observable.throw(err)
        })
      )
  }

  listarEstudiantes(id_curso: string) {
    let url = `${URL_SERVICES}/aula/cursos/matricula/estudiantes/${id_curso}`

    return this._http.get(url, { headers: this._userService.cargarHeaders() })
      .pipe(
        map((data: any) => data.data.estudiantes),
        catchError((err: any) => {
          console.log(err);
          Swal.fire({
            title: "Error en la peticion!",
            text: err.error.message,
            icon: "error",
            confirmButtonText: "Cool"
          });
          return Observable.throw(err)
        })
      )
  }

  eliminarEstudiantes(id_curso: string, id_matricula: string) {
    let url = `${URL_SERVICES}/aula/cursos/matricula/estudiante/${id_curso}/${id_matricula}`

    return this._http.delete(url, { headers: this._userService.cargarHeaders() })
      .pipe(
        map((data: any) => data),
        catchError((err: any) => {
          console.log(err);
          Swal.fire({
            title: "Error en la peticion!",
            text: err.error.message,
            icon: "error",
            confirmButtonText: "Cool"
          });
          return Observable.throw(err)
        })
      )
  }

}
