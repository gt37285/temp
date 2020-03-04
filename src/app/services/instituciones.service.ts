import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http';
import InstitucionModel from '../models/cursos/institucion.model';
import { URL_SERVICES } from '../config/config';
import { map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';
import Swal from 'sweetalert2';
import { UsuariosService } from './usuarios.service';

@Injectable({
    providedIn: 'root'
})

export class InstitucionService{

    constructor(
        private _http: HttpClient,
        private userService: UsuariosService
    ) { }


    agregar(institucion: InstitucionModel) {
        let url = `${URL_SERVICES}/aula/institucion`
        return this._http.post(url, institucion, { headers: this.userService.cargarHeaders() })
            .pipe(
                map((data: any) =>  data),
                catchError((err: any) => {
                    Swal.fire({
                        title: "Error!",
                        text: err.error.message,
                        icon: "error",
                        confirmButtonText: "Cool"
                    })
                    return Observable.throw(err)
                })
            )
    }

    /**lista de manera paginada */

    listar(desde: number = 0) {
        let url = `${URL_SERVICES}/aula/institucion?desde=${desde}`
        return this._http.get(url, { headers: this.userService.cargarHeaders() })
            .pipe(
                map(data => {
                    return data
                }),
                catchError((err: any) => {
                    Swal.fire({
                        title: "Error!",
                        text: err.error.message,
                        icon: "error",
                        confirmButtonText: "Cool"
                    })
                    return Observable.throw(err)
                })
            )
    }

    /**lista tadas las instituciones */

    listarall() {
        
        let url = `${URL_SERVICES}/aula/institucionall`
        return this._http.get(url, { headers: this.userService.cargarHeaders() })
            .pipe(
                map(data => data),
                catchError((err: any) => {
                    Swal.fire({
                        title: "Error!",
                        text: err.error.message,
                        icon: "error",
                        confirmButtonText: "Cool"
                    })
                    return Observable.throw(err)
                })
            )
    }

    listarId(id:String) {
        let url = `${URL_SERVICES}/aula/institucion/${id}`
        return this._http.get(url, { headers: this.userService.cargarHeaders() })
            .pipe(
                map(data => data),
                catchError((err: any) => {
                    Swal.fire({
                        title: "Error!",
                        text: err.error.message,
                        icon: "error",
                        confirmButtonText: "Cool"
                    })
                    return Observable.throw(err)
                })
            )
    }

    actualizar(institucion: InstitucionModel,id: String) {
        let url = `${URL_SERVICES}/aula/institucion/${id}`
        return this._http.put(url, institucion, { headers: this.userService.cargarHeaders() })
            .pipe(
                map(data => data),
                catchError((err: any) => {
                    Swal.fire({
                        title: "Error!",
                        text: err.error.message,
                        icon: "error",
                        confirmButtonText: "Cool"
                    })
                    return Observable.throw(err)
                })
            )
    }

    eliminar(id: String) {
        let url = `${URL_SERVICES}/aula/institucion/${id}`
        return this._http.delete(url, { headers: this.userService.cargarHeaders() })
            .pipe(
                map(data => data),
                catchError((err: any) => {
                    Swal.fire({
                        title: "Error!",
                        text: err.error.message,
                        icon: "error",
                        confirmButtonText: "Cool"
                    })
                    return Observable.throw(err)
                })
            )
    }

    buscar(termino: string) {
        let url = `${URL_SERVICES}/search/institucion/${termino}`;

        

        return this._http.get(url, { headers: this.userService.cargarHeaders() })
        .pipe(
            map((data: any) => data.data.instituciones),
            catchError(err => {

                Swal.fire({
                    title: "Error!",
                    text: err.error.message,
                    icon: "error",
                    confirmButtonText: "Cool"
                })
                return Observable.throw(err)
            })
        );
    }
}