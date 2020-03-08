import { Injectable } from "@angular/core";
import { URL_SERVICES } from '../config/config';
import { UsuariosService } from './usuarios.service';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { tareasModel } from '../models/clases/tareas.model';


@Injectable({
    providedIn: 'root'
})

export class calificacionesService{
    
    constructor(
        private userService:UsuariosService,
        private http:HttpClient
    ){}

    listarTareas(id_curso:String){
        let url = `${URL_SERVICES}/aula/reportes/calificaciones/tareas/${id_curso}/${this.userService.user._id}`

        return this.http.get(url,{headers:this.userService.cargarHeaders()})
            .pipe(
                map((data:any) => data),
                catchError((err:any) => {
                    console.log(err);

                    return Swal.fire({
                        title: 'Error',
                        text: err.error.message,
                        icon: 'error'
                    })
                })
            )
    }

    listarEvaluacion(id_curso:String){
        let url = `${URL_SERVICES}/aula/reportes/calificaciones/evaluaciones/${id_curso}/${this.userService.user._id}`

        return this.http.get(url,{headers:this.userService.cargarHeaders()})
            .pipe(
                map((data:any) => data),
                catchError((err:any) => {
                    console.log(err);

                    return Swal.fire({
                        title: 'Error',
                        text: err.error.message,
                        icon: 'error'
                    })
                })
            )
    }
}