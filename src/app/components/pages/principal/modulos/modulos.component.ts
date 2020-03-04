import { Component, OnInit } from '@angular/core';
import { cursoModel } from '../../../../models/cursos/cursos.model';
import { CursosService } from '../../../../services/cursos.service';
import { ActivatedRoute, Router } from '@angular/router';
import { claseModel } from '../../../../models/clases/clase.model';
import { recursoModel } from '../../../../models/clases/recurso.model';
import { RecursosProfService } from '../../../../services/recursos-prof.service';
import { URL_SERVICES } from 'src/app/config/config';
import { tareasModel } from '../../../../models/clases/tareas.model';
import { TareasService } from '../../../../services/tareas.service';
import { UsuariosService } from '../../../../services/usuarios.service';
import { evaluacionModel } from 'src/app/models/cursos/evaluacion.model';
import { evaluacionesService } from 'src/app/services/evaluaciones.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modulos',
  templateUrl: './modulos.component.html',
  styleUrls: ['./modulos.component.scss']
})
export class ModulosComponent implements OnInit {

  public curso: cursoModel
  public loading: boolean = false
  public clase: claseModel
  public show_comentarios: boolean = false
  public archivo: string = ''
  public totalRec: number = 0
  public tareas: tareasModel[] = []
  public evaluaciones:evaluacionModel[] =[]

  constructor(
    private router:Router,
    private _cursoService: CursosService,
    private tareasService: TareasService,
    private userService: UsuariosService,
    private evaluacionService: evaluacionesService

  ) {  }

  ngOnInit() {

    this.curso = this._cursoService.cursos
    this.clase = this._cursoService.cursos.modulos[0].clases[0]
    this.cargarTareas()
    this.cargarEvaluaciones()
  }


  changeVideo(clase: any) {
    this.clase = clase
  }

  descarga(recurso: recursoModel) {

    if (recurso.extension == 'pdf') {
      this.archivo = recurso.nombre
    }

  }

  cargarTareas() {
    this.loading = true
    this.tareasService.cargarTareaPorUsuario(this.userService.user._id)
      .subscribe(data => {
        this.tareas = data
        this.loading = false
    },
      (err => this.loading = false)
    )

  }

  cargarEvaluaciones(){
    this.loading = true
    this.evaluacionService.listar_curso(this.curso._id)
      .subscribe(
        ((data:any) => {
          this.evaluaciones = data.evaluaciones
          this.loading = false
        }),
        (err=>this.loading = false)
      )
  }

  evaluacionregistro(evaluacion_id:string){

    sessionStorage.setItem('evd',evaluacion_id)

    this.evaluacionService.verificarEstudiante(evaluacion_id)
    .subscribe((data:any) => {
      sessionStorage.setItem('izx', data.intentos)
      this.router.navigate(['/aula/evaluaciones/',evaluacion_id])
    })

  }


}
