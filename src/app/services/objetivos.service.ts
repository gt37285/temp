import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { URL_SERVICES } from '../config/config';
import { UsuariosService } from './usuarios.service';
import { map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';
import { ObjetivoModel } from '../models/cursos/objetivos.model';
import Swal from 'sweetalert2';


@Injectable({
    providedIn: 'root'
})

export class ObjetivosService{

    constructor(
        private http: HttpClient,
        private userService: UsuariosService
    ) { }
    
    agregarObjetivo(objetivo: ObjetivoModel,id_curso:string) {
        let url = `${URL_SERVICES}/aula/cursos/objetivos/${id_curso}`

        return this.http.post(url, objetivo, { headers: this.userService.cargarHeaders() })
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

    listarObjetivos(id_curso:string) {
        let url = `${URL_SERVICES}/aula/cursos/objetivos/${id_curso}`

        return this.http.get(url, { headers: this.userService.cargarHeaders() })
            .pipe(
                map((data: any) => data.data.objetivos),
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

    actualizarObjetivo(objetivo: ObjetivoModel, id_curso: string) {
        let url = `${URL_SERVICES}/aula/cursos/objetivos/${id_curso}/${objetivo._id}`

        return this.http.put(url, objetivo, { headers: this.userService.cargarHeaders() })
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

    eliminarObjetivos(id_curso: string, id_objetivo) {
        let url = `${URL_SERVICES}/aula/cursos/objetivos/${id_curso}/${id_objetivo}`

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