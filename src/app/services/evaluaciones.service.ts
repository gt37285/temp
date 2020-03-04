import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { URL_SERVICES } from '../config/config';
import { UsuariosService } from './usuarios.service';
import { catchError, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { evaluacionModel } from '../models/cursos/evaluacion.model';
import { preguntaModel } from '../models/cursos/pregunta.model';


@Injectable({
    providedIn: 'root'
})

export class evaluacionesService {

    public permisoEvaluacion:any = false

    constructor( 
        private http:HttpClient,
        private userService: UsuariosService
    ){}


    agregar(evaluacion:evaluacionModel){
        let url = `${URL_SERVICES}/aula/evaluacion`

        return this.http.post(url,evaluacion,{headers: this.userService.cargarHeaders()})
            .pipe(
                map((data:any) => {
                    return data
                }),
                catchError((err:any) => {

                    console.log(err);

                    Swal.fire({
                        title: 'Error',
                        text: err.error.message,
                        icon: 'error'
                    })

                    return Observable.throw(err)
                })
            )
    }

    actualizar(evaluacion:evaluacionModel){
        let url = `${URL_SERVICES}/aula/evaluacion/${evaluacion._id}`

        return this.http.put(url,evaluacion,{headers: this.userService.cargarHeaders()})
            .pipe(
                map((data:any) => {
                    return data
                }),
                catchError((err:any) => {

                    console.log(err);

                    Swal.fire({
                        title: 'Error',
                        text: err.error.message,
                        icon: 'error'
                    })

                    return Observable.throw(err)
                })
            )
    }



    eliminar(id_evaluacion:String){
        let url = `${URL_SERVICES}/aula/evaluacion/${id_evaluacion}`

        return this.http.delete(url,{headers: this.userService.cargarHeaders()})
            .pipe(
                map((data:any) => {
                    return data
                }),
                catchError((err:any) => {

                    console.log(err);

                    Swal.fire({
                        title: 'Error',
                        text: err.error.message,
                        icon: 'error'
                    })

                    return Observable.throw(err)
                })
            )
    }


    listar(){
        let url = `${URL_SERVICES}/aula/evaluacion`

        return this.http.get(url,{headers: this.userService.cargarHeaders()})
            .pipe(
                map((data:any) => {
                    return data
                }),
                catchError((err:any) => {

                    console.log(err);

                    Swal.fire({
                        title: 'Error',
                        text: err.error.message,
                        icon: 'error'
                    })

                    return Observable.throw(err)
                })
            )
    }

    listarPorId(id_evaluacion:String){
        let url = `${URL_SERVICES}/aula/evaluacion/${id_evaluacion}`

        return this.http.get(url,{headers: this.userService.cargarHeaders()})
            .pipe(
                map((data:any) => {
                    return data
                }),
                catchError((err:any) => {

                    console.log(err);

                    Swal.fire({
                        title: 'Error',
                        text: err.error.message,
                        icon: 'error'
                    })

                    return Observable.throw(err)
                })
            )
    }

    listar_curso(id_curso:String){
        let url = `${URL_SERVICES}/aula/evaluacion/curso/${id_curso}`

        return this.http.get(url,{headers: this.userService.cargarHeaders()})
            .pipe(
                map((data:any) => {
                    return data
                }),
                catchError((err:any) => {

                    console.log(err);

                    Swal.fire({
                        title: 'Error',
                        text: err.error.message,
                        icon: 'error'
                    })

                    return Observable.throw(err)
                })
            )
    }


    /**preguntas */


    agregarPregunta(pregunta:preguntaModel,id_evaluacion:String){
        let url = `${URL_SERVICES}/aula/evaluacion/preguntas/${id_evaluacion}`

        return this.http.post(url,pregunta,{headers: this.userService.cargarHeaders()})
            .pipe(
                map((data:any) => {
                    return data
                }),
                catchError((err:any) => {

                    console.log(err);

                    Swal.fire({
                        title: 'Error',
                        text: err.error.message,
                        icon: 'error'
                    })

                    return Observable.throw(err)
                })
            )   
    }

    actualizarPregunta(pregunta:any,id_evaluacion:String,id_pregunta:String){
        let url = `${URL_SERVICES}/aula/evaluacion/preguntas/${id_evaluacion}/${id_pregunta}`

        return this.http.put(url,pregunta,{headers: this.userService.cargarHeaders()})
            .pipe(
                map((data:any) => {
                    return data
                }),
                catchError((err:any) => {

                    console.log(err);

                    Swal.fire({
                        title: 'Error',
                        text: err.error.message,
                        icon: 'error'
                    })

                    return Observable.throw(err)
                })
            )   
    }

    listarPreguntas(id_evaluacion:String){
        let url = `${URL_SERVICES}/aula/evaluacion/preguntas/${id_evaluacion}`

        return this.http.get(url,{headers: this.userService.cargarHeaders()})
            .pipe(
                map((data:any) => {
                    return data
                }),
                catchError((err:any) => {

                    console.log(err);

                    Swal.fire({
                        title: 'Error',
                        text: err.error.message,
                        icon: 'error'
                    })

                    return Observable.throw(err)
                })
            )   
    }


    eliminarPregunta(id_evaluacion:String,id_pregunta:String){
        let url = `${URL_SERVICES}/aula/evaluacion/preguntas/${id_evaluacion}/${id_pregunta}`

        return this.http.delete(url,{headers: this.userService.cargarHeaders()})
            .pipe(
                map((data:any) => {
                    return data
                }),
                catchError((err:any) => {

                    console.log(err);

                    Swal.fire({
                        title: 'Error',
                        text: err.error.message,
                        icon: 'error'
                    })

                    return Observable.throw(err)
                })
            )
    }


    listarPreguntaId(id_evaluacion:String,id_pregunta:String){
        let url = `${URL_SERVICES}/aula/evaluacion/preguntas/${id_evaluacion}/${id_pregunta}`

        return this.http.get(url,{headers: this.userService.cargarHeaders()})
            .pipe(
                map((data:any) => {
                    return data
                }),
                catchError((err:any) => {

                    console.log(err);

                    Swal.fire({
                        title: 'Error',
                        text: err.error.message,
                        icon: 'error'
                    })

                    return Observable.throw(err)
                })
            )
    }

    /**respuestas */

    agregarRespuestas(respuestas:any,id_evaluacion:String,id_pregunta:String){
        let url = `${URL_SERVICES}/aula/evaluacion/respuestas/${id_evaluacion}/${id_pregunta}`

        return this.http.post(url,respuestas,{headers: this.userService.cargarHeaders()})
            .pipe(
                map((data:any) => {
                    return data
                }),
                catchError((err:any) => {

                    console.log(err);

                    Swal.fire({
                        title: 'Error',
                        text: err.error.message,
                        icon: 'error'
                    })

                    return Observable.throw(err)
                })
            )   
    }


    agregarEstudiante(evaluacion:evaluacionModel, id_evaluacion:String) {

        let url = `${URL_SERVICES}/aula/evaluacion/estudiante/${id_evaluacion}`

        return this.http.put(url,evaluacion,{headers: this.userService.cargarHeaders()})
            .pipe(
                map((data:any) => {
                    return data
                }),
                catchError((err:any) => {

                    console.log(err);

                    Swal.fire({
                        title: 'Error',
                        text: err.error.message,
                        icon: 'error'
                    })

                    return Observable.throw(err)
                })
            ) 
    }


    verificarEstudiante(id_evaluacion:String) {

        let url = `${URL_SERVICES}/aula/evaluacion/estudiante/${id_evaluacion}/${this.userService.user._id}`

        return this.http.get(url,{headers: this.userService.cargarHeaders()})
            .pipe(
                map((data:any) => {
                    return data
                }),
                catchError((err:any) => {

                    console.log(err);

                    Swal.fire({
                        title: 'Error',
                        text: err.error.message,
                        icon: 'error'
                    })

                    return Observable.throw(err)
                })
            ) 
    }


    resultados(id_evaluacion:String) {

        let url = `${URL_SERVICES}/aula/evaluacion/resultados/${id_evaluacion}/${this.userService.user._id}`

        return this.http.get(url,{headers: this.userService.cargarHeaders()})
            .pipe(
                map((data:any) => {
                    return data
                }),
                catchError((err:any) => {

                    console.log(err);

                    Swal.fire({
                        title: 'Error',
                        text: err.error.message,
                        icon: 'error'
                    })

                    return Observable.throw(err)
                })
            ) 
    }




}