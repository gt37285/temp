import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { URL_SERVICES } from '../config/config';
import { UsuariosService } from './usuarios.service';
import { map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';
import Swal from 'sweetalert2';
import { requerimentoModel } from '../models/cursos/requerimentos.model';


@Injectable({
    providedIn: 'root'
})

export class requerimentosService {

    constructor(
        private http: HttpClient,
        private userService: UsuariosService
    ) { }

    agregar(requerimento: requerimentoModel, id_curso: string) {
        let url = `${URL_SERVICES}/aula/cursos/requisitos/${id_curso}`

        return this.http.post(url, requerimento, { headers: this.userService.cargarHeaders() })
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

    listar(id_curso: string) {
        let url = `${URL_SERVICES}/aula/cursos/requisitos/${id_curso}`

        return this.http.get(url, { headers: this.userService.cargarHeaders() })
            .pipe(
                map((data: any) => data.data.requerimentos),
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

    actualizar(requerimento: requerimentoModel, id_curso: string) {
        let url = `${URL_SERVICES}/aula/cursos/requisitos/${id_curso}/${requerimento._id}`

        return this.http.put(url, requerimento, { headers: this.userService.cargarHeaders() })
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

    eliminar(id_curso: string, id_requerimento) {
        let url = `${URL_SERVICES}/aula/cursos/requisitos/${id_curso}/${id_requerimento}`

        return this.http.delete(url, { headers: this.userService.cargarHeaders() })
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