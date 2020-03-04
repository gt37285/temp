import { Component, OnInit, Renderer2 } from '@angular/core';
import { evaluacionesService } from 'src/app/services/evaluaciones.service';
import { CursosService } from 'src/app/services/cursos.service';
import { evaluacionModel } from 'src/app/models/cursos/evaluacion.model';
import { cursoModel } from 'src/app/models/cursos/cursos.model';
import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-evaluaciones',
  templateUrl: './evaluaciones.component.html',
  styleUrls: ['./evaluaciones.component.scss','../gestion.component.scss']
})
export class EvaluacionesComponent implements OnInit {

  public evaluaciones:evaluacionModel[] = []
  public selectedCurso:String = ""
  public cursos:cursoModel[] = []
  public loading:Boolean = false
  public total:Number = 0
  public minDate: any = `${new Date().getFullYear()}-0${new Date().getMonth()+1}-${new Date().getDate()}T16:00:00`
  public selectedCursoReg:String = ""

  public minutos:String[] = []
  public horas:String[] = []
  public selectMinutos:String = ''
  public selectHoras:String = ''


  constructor(
    private service:evaluacionesService,
    private cursoService: CursosService,
    private router:Router,
    private render:Renderer2

  ) { 
    for (let i = 0; i < 60; i++) {
      if(i < 9){
        this.minutos[i] = `0${(i+1)}`
      }else{
        this.minutos[i] = (i+1).toString()
      }
    }

    for (let i = 0; i < 24; i++) {
      if(i < 9){
        this.horas[i] = `0${(i)}`
      }else{
        this.horas[i] = (i).toString()
      }
    }
  }

  ngOnInit() {
    this.listarCursos()
  }

  listarCursos(){
    this.loading = true
    this.cursoService.cargarCursoProfesorall()
      .subscribe( 
        (curso:any) => {
          this.cursos = curso.data
          this.loading = false
        },
        (err => this.loading = false)   
     )
  }

  listarPorCurso(){
    if( !this.selectedCurso ){
      return Swal.fire({
        title: 'Error',
        text: 'Debe seleccionar un curso',
        icon: 'warning'
      })
    }  

    this.loading = true
    this.service.listar_curso(this.selectedCurso)
      .subscribe(
        ((evaluacion:any)=>{
          this.evaluaciones = evaluacion.evaluaciones
          this.total = evaluacion.evaluaciones.length
          this.loading = false
        }),
        (err => this.loading = false)
      )

  }


  eliminar(evaluacion:evaluacionModel){
    Swal.fire({
      title: "Estas Seguro?",
      text: `Confirma que deseas eliminar la evaluacion`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Continuar"
    }).then(data => {
      if (data.value) {
        this.loading = true
        this.service.eliminar(evaluacion._id)
          .subscribe(
            ((data: any) => {
              Swal.fire({
                title: 'Proceso completado',
                text: data.message,
                icon: 'success'
              })
              this.loading = false
              this.listarPorCurso()
            }),
            (err => this.loading = false)
          )
      }
    });
  }


  crearEvaluacion(form:NgForm,modal:any){

    if(form.invalid){
      return Swal.fire({
        title: 'Formulario invalido',
        text: 'completa todos los campos. La descripcion es opcional',
        icon: 'warning'
      })
    }

    if(!this.selectedCursoReg){
      return Swal.fire({
        title: 'Formulario invalido',
        text: 'No se ha seleccionado el curso',
        icon: 'warning'
      })
    }

    if(!this.selectMinutos){
      return Swal.fire({
        title: 'Formulario invalido',
        text: 'Selecciona los minutos',
        icon: 'warning'
      })
    }

    if(!this.selectHoras){
      return Swal.fire({
        title: 'Formulario invalido',
        text: 'Selecciona una hora',
        icon: 'warning'
      })
    }


    let tiempo = `${this.selectHoras}:${this.selectMinutos}:01`
    let evaluacion:evaluacionModel = form.value
    evaluacion.tiempo = tiempo
    evaluacion.curso = this.selectedCursoReg

    if(form.value.fecha_f <= form.value.fecha_i){
      return Swal.fire({
        title: 'Formulario invalido',
        text: 'la fecha de caducidad no puede ser inferior o igual a la fecha de inicio',
        icon: 'warning'
      })
    }

    let pregunta:any ={
      tipo:'D'
    }


    this.loading = true
    this.service.agregar(evaluacion)
      .subscribe(
        ((data:any) => {
          Swal.fire({
            title: 'Proceso completado',
            text: 'la evaluacion ha sido registrada',
            icon: 'success'
          })
          this.loading = false
          form.reset()
          this.render.removeClass(modal,'show-modal')
          this.service.agregarPregunta(pregunta,data.id)
            .subscribe((data => data))
        }),
        (err => this.loading = false)
      )
  }

  estadistica(evaluacion:evaluacionModel){
    this.router.navigate(['/aula/prof/evaluaciones/formulario/',evaluacion._id])
  }

  showModal(modal:any){
    this.render.addClass(modal,'show-modal')
  }

  hiddenModal(modal:any,form:NgForm){
    this.render.removeClass(modal,'show-modal')
    form.reset()
  }

}
