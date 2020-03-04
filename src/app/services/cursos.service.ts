import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { URL_SERVICES } from "../config/config";
import { UsuariosService } from "./usuarios.service";
import { map, catchError } from 'rxjs/operators';
import { cursoModel } from '../models/cursos/cursos.model';
import { Observable } from 'rxjs/internal/Observable';
import Swal from "sweetalert2";

@Injectable({
  providedIn: "root"
})
export class CursosService {

  public cursos: any
  public curso: any
  public id_curso: string
  public matricula:boolean = false

  constructor(
    private _http: HttpClient,
    private _userService: UsuariosService
  ) {
    this.cargarStorage()
    this.matricula = JSON.parse(sessionStorage.getItem('eix'))
  }

  cargarCursos(desde: number = 0) {
    let url = `${URL_SERVICES}/aula/cursos?desde=${desde}`;

    return this._http
      .get(url, { headers: this._userService.cargarHeaders() })
      .pipe(
        map((data: any) => {
          this.cursos = data.curso
          this.guardarStorage(data.curso)
          return data.curso
        }),
        catchError(err => {

          console.log(err);
          if(err.status == 0){
            this._userService.logout()
          }else{
            let mensaje = err.error.err.message
    
            return Swal.fire({
              title: "Advertencia!",
              text: mensaje,
              icon: "warning",
              confirmButtonText: "Cool"
            })
          }

        })
      );
  }

  listarTodoslosCursos(){
    let url = `${URL_SERVICES}/aula/cursos/all`;

    return this._http
      .get(url, { headers: this._userService.cargarHeaders() })
      .pipe(
        map((data: any) => {
          this.cursos = data.curso
          this.guardarStorage(data.curso)
          return data.curso
        }),
        catchError(err => {

          console.log(err);
          if(err.status == 0){
            this._userService.logout()
          }else{
            let mensaje = err.error.err.message
    
            return Swal.fire({
              title: "Advertencia!",
              text: mensaje,
              icon: "warning",
              confirmButtonText: "Cool"
            })
          }

        })
      );
  }

  cargarCurso(id: string) {

    let url = `${URL_SERVICES}/aula/cursos/${id}`;

    return this._http
      .get(url, { headers: this._userService.cargarHeaders() })
      .pipe(
        map((data: any) => {
          this.cursos = data.curso
          this.guardarStorage(data.curso)
          return data.curso
        }),
        catchError(err => {

          console.log(err);

          if(err.status == 0){
            this._userService.logout()
          }else{
            let mensaje = err.error.err.message
    
            return Swal.fire({
              title: "Advertencia!",
              text: mensaje,
              icon: "warning",
              confirmButtonText: "Cool"
            })
          }

        })
      );
  }

  cargarCursoProfesor(desde: number = 0) {
    let url = `${URL_SERVICES}/aula/cursos/prof/${this._userService.user._id}?desde=${desde}`;
    return this._http
      .get(url, { headers: this._userService.cargarHeaders() })
      .pipe(
        map((data: any) => data),
        catchError(err => {

          console.log(err);

          if(err.status == 0){
            this._userService.logout()
          }else{
            let mensaje = err.error.err.message
    
            return Swal.fire({
              title: "Advertencia!",
              text: mensaje,
              icon: "warning",
              confirmButtonText: "Cool"
            })
          }

        })
      );
  }

  cargarCursoProfesorall() {
    let url = `${URL_SERVICES}/aula/cursos/profall/${this._userService.user._id}`;
    return this._http
      .get(url, { headers: this._userService.cargarHeaders() })
      .pipe(
        map((data: any) => data),
        catchError(err => {

          console.log(err);

          if(err.status == 0){
            this._userService.logout()
          }else{
            let mensaje = err.error.err.message
    
            return Swal.fire({
              title: "Advertencia!",
              text: mensaje,
              icon: "warning",
              confirmButtonText: "Cool"
            })
          }

        })
      );
  }

  cargarStorage() {
    if (localStorage.getItem('cursos')) {
      this.cursos = JSON.parse(localStorage.getItem('cursos'))
    } else {
      localStorage.removeItem('cursos')
    }
  }

  guardarStorage(cursos: cursoModel) {
    this.cursos = cursos
    localStorage.setItem('cursos', JSON.stringify(cursos))
  }

  buscarCursos(termino: string) {
    let url = `${URL_SERVICES}/search/cursos/${termino}`;

    return this._http
      .get(url, { headers: this._userService.cargarHeaders() })
      .pipe(
        map((data: any) => data.data.cursos),
        catchError(err => {

          console.log(err);

          if(err.status == 0){
            this._userService.logout()
          }else{
            let mensaje = err.error.err.message
    
            return Swal.fire({
              title: "Advertencia!",
              text: mensaje,
              icon: "warning",
              confirmButtonText: "Cool"
            })
          }

        })
      );
  }

  crearCurso(curso: cursoModel) {
    let url = `${URL_SERVICES}/aula/cursos`;
    return this._http.post(url, curso, {
      headers: this._userService.cargarHeaders()
    }).pipe(
      map(data => data),
      catchError(err => {

        console.log(err);

        if(err.status == 0){
          this._userService.logout()
        }else{
          let mensaje = err.error.err.message
  
          return Swal.fire({
            title: "Advertencia!",
            text: mensaje,
            icon: "warning",
            confirmButtonText: "Cool"
          })
        }


      })
    )
  }

  actualizarCurso(curso: cursoModel) {
    let url = `${URL_SERVICES}/aula/cursos/${curso._id}`;
    return this._http.put(url, curso, {
      headers: this._userService.cargarHeaders()
    }).pipe(
      map(data => data),
      catchError(err => {

        console.log(err);

        if(err.status == 0){
          this._userService.logout()
        }else{
          let mensaje = err.error.err.message
  
          return Swal.fire({
            title: "Advertencia!",
            text: mensaje,
            icon: "warning",
            confirmButtonText: "Cool"
          })
        }

      })
    )
  }

  eliminarCurso(curso: cursoModel) {
    let url = `${URL_SERVICES}/aula/cursos/${curso._id}`;
    return this._http.delete(url, {
      headers: this._userService.cargarHeaders()
    }).pipe(
      map(data => data),
      catchError(err => {


        console.log(err);
        if(err.status == 0){
          this._userService.logout()
        }else{
          let mensaje = err.error.err.message
  
          return Swal.fire({
            title: "Advertencia!",
            text: mensaje,
            icon: "warning",
            confirmButtonText: "Cool"
          })
        }

      })
    )
  }

  registro(id: string) {

    let url = `${URL_SERVICES}/aula/cursos/matricula/pendientes/${id}`;

    const registro = {
      estudiante: this._userService.user._id
    }

    return this._http.post(url, registro, {
      headers: this._userService.cargarHeaders()
    }).pipe(
      map((data: any) => data),
      catchError(err => {
        console.log(err);
        let mensaje = err.error.message
        return Swal.fire({
          title: "Alerta!",
          text: mensaje,
          icon: "warning",
          confirmButtonText: "Cool"
        });

      })
    )

  }


  verificarMatricula() {
    let url = `${URL_SERVICES}/aula/cursos/matricula/${this.id_curso}/${this._userService.user._id}`;


    return this._http.get(url, {
      headers: this._userService.cargarHeaders()
    }).pipe(
      map((data: any) => {
        sessionStorage.setItem("eix",JSON.parse(data.estudiante.estado))
        return data.estudiante
      }),
      catchError(err => {
        
        let mensaje = err.error.message
        console.log(err);
        return Observable.throw(err)

      })
    )
  }

}
