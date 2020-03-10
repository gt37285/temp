import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { calificacionesService } from 'src/app/services/calificaciones.service';
import { ActivatedRoute } from '@angular/router';
import { tareasModel } from 'src/app/models/clases/tareas.model';
import { evaluacionModel } from 'src/app/models/cursos/evaluacion.model';

@Component({
  selector: 'app-calificaciones',
  templateUrl: './calificaciones.component.html',
  styleUrls: ['./calificaciones.component.scss']
})
export class CalificacionesComponent implements OnInit {


  public usuario:string = ''
  public loading:Boolean = false
  public id_curso:String = ''
  public tareas:tareasModel[] = []
  public evaluaciones:evaluacionModel[] = []
  public total:number = 0
  public numeroEvaluaciones:number = 0
  public promediototal:number = 0

  constructor(
    private userService:UsuariosService,
    private service: calificacionesService,
    private router:ActivatedRoute
  ) { 
    this.usuario = `${this.userService.user.nombre} ${this.userService.user.apellido}`
    this.router.params.subscribe((data:any) => this.id_curso = data.id)
  }

  ngOnInit() {
    this.listarTareas()
    this.listarEvaluaciones()
    this.promedio()

  }

  promedio(){

    let total = Number(sessionStorage.getItem('total'))
    let num = Number(sessionStorage.getItem('totalevx'))
    this.promediototal =  ( total * 10 ) / ( num * 10)
  }


  listarTareas(){
    this.loading = true
    this.service.listarTareas(this.id_curso)
      .subscribe(
        ((data:any) => {


          for (const item of data) {
            this.total += Number(item.nota)
          }

          sessionStorage.setItem('total',this.total.toString())
          this.numeroEvaluaciones+= data.length
          sessionStorage.setItem('totalevx', this.numeroEvaluaciones.toString())
          this.tareas = data
          this.loading = false
        }),
        ()=>this.loading = false
      )
  }

  listarEvaluaciones(){
    this.loading = true
    this.service.listarEvaluacion(this.id_curso)
      .subscribe(
        ((data:any) => {

          for (const item of data) {
            this.total += Number(item.nota)
          }

          sessionStorage.setItem('total',this.total.toString())
          this.numeroEvaluaciones+= data.length
          sessionStorage.setItem('totalevx', this.numeroEvaluaciones.toString())
          this.evaluaciones = data
          this.loading = false
        }),
        ()=>this.loading = false
      )
  }


}
