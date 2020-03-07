import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { evaluacionesService } from 'src/app/services/evaluaciones.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';
import { evaluacionModel } from 'src/app/models/cursos/evaluacion.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {

  private id: String = ''
  public loading: Boolean = false
  public evaluaciones: any = []
  public tiempo: any = null

  @ViewChild('form', { static: true }) form: NgForm;

  constructor(
    private router: Router,
    private active_router: ActivatedRoute,
    private service: evaluacionesService,
    public userService: UsuariosService
  ) {
    this.active_router.params.subscribe((data: any) => this.id = data.id)
  }

  async ngOnInit() {
    this.cargarEvaluacion()
  }

  cargarEvaluacion() {
    this.loading = true
    this.service.listarPorId(this.id)
      .subscribe(
        ((data: any) => {
          this.evaluaciones = data.evaluacion

          if (sessionStorage.getItem('tiempo')) {
            this.tiempo = sessionStorage.getItem('tiempo')
          } else {
            this.tiempo = data.evaluacion.tiempo
          }

          this.calcularTiempo(this.tiempo)

          this.loading = false
        }),
        (err => this.loading = false)
      )
  }

  resultado() {

    let respuestasform = this.form.value
    let preguntas = this.evaluaciones.preguntas

    let puntaje: number = 0
    let puntajeaux: number = 0

    for (const i in preguntas) {
      puntajeaux += preguntas[i].puntaje

      if (preguntas[i].tipo == 'B') {
        puntaje += this.respuestasTipoB(preguntas[i], respuestasform, i)
      }

      if (preguntas[i].tipo == 'D' || preguntas[i].tipo == 'A') {
        puntaje += this.respuestasTipoAD(preguntas[i], respuestasform, i)
      }
    }

    puntaje = (puntaje * 10) / puntajeaux

    let data: any = {
      usuario: this.userService.user._id,
      puntaje: puntaje.toPrecision(3),
      intentos: 1
    }

    let id_evaluacion = this.evaluaciones._id

    this.loading = true
    this.service.agregarEstudiante(data, id_evaluacion)
      .subscribe(
        ((data: any) => {
          Swal.fire({
            title: 'Proceso completado',
            text: data.message,
            icon: 'success'
          })

          sessionStorage.removeItem('evd')
          sessionStorage.removeItem('tiempo')
          sessionStorage.removeItem('izx')

          this.router.navigate(['/aula/evaluaciones/registro/resultados', this.id])
          this.loading = false
        }),
        (err => this.loading = false)
      )
  }


  respuestasTipoB(preguntas: any, respuestasform: any, i: any) {

    let aux: any = null
    let correctas: number = 0
    let correctasaux: number = 0
    let incorrectasaux: number = 0
    let puntaje: number = 0
    let cant_respuestas: number = 0
    let puntajeaux: number = 0

    puntaje = preguntas.puntaje

    for (const item of preguntas.respuestas) {
      if (item.estado) correctas++
    }

    for (const j in preguntas.respuestas) {
      aux = preguntas.respuestas[j]
      cant_respuestas = Number(j) + 1

      if (aux.estado && respuestasform[`r${i}${j}`] == aux.estado) {
        correctasaux++
      }

      if (!aux.estado && respuestasform[`r${i}${j}`] == !aux.estado) {
        incorrectasaux++
      }
    }

    puntajeaux = (puntaje / cant_respuestas)
    puntajeaux = puntajeaux * incorrectasaux

    puntaje = ((correctasaux * puntaje) / correctas) - puntajeaux

    if (puntaje <= 0 || (correctasaux + incorrectasaux) == cant_respuestas) puntaje = 0

    return puntaje
  }

  respuestasTipoAD(preguntas: any, respuestasform: any, i: any) {

    let aux = null
    let correctasaux: Boolean = false
    let puntaje: number = 0

    for (const j in preguntas.respuestas) {
      aux = preguntas.respuestas[j]

      if (aux.estado && respuestasform[`r${i}`] == aux.estado.toString()) correctasaux = true

    }

    if (correctasaux) puntaje = preguntas.puntaje

    return puntaje
  }

  calcularTiempo(tiempo: any) {

    let obj = new Observable(Observer => {


      let tiempoaux = tiempo.split(':')
      let horas = Number(tiempoaux[0])
      let minutos = Number(tiempoaux[1])
      let segundos = Number(tiempoaux[2])

      let segundoaux: String = null
      let minutoaux: String = null
      let horaaux: String = null



      setInterval(() => {
        segundos--

        if (segundos < 0) {

          minutos--
          segundos = 59

          if (minutos < 0) {
            horas--
            minutos = 59
          }
        }

        /**se completa el intervalo de tiempo */

        if (horas == 0 && minutos == 0 && segundos == 0) {
          Observer.complete()
        }

        /**se formatea el tiempo */

        if (segundos <= 9) {
          segundoaux = `0${segundos}`
        } else {
          segundoaux = segundos.toString()
        }

        if (minutos <= 9) {
          minutoaux = `0${minutos}`
        } else {
          minutoaux = minutos.toString()
        }


        if (horas <= 9) {
          horaaux = `0${horas}`
        } else {
          horaaux = horas.toString()
        }

        Observer.next(`${horaaux}:${minutoaux}:${segundoaux}`)
      }, 1000)
    })

    obj.subscribe(
      (cronometro => {
        sessionStorage.setItem('tiempo', cronometro.toString())
        this.tiempo = cronometro
      }),
      () => {},
      () => this.resultado())

  }

}
