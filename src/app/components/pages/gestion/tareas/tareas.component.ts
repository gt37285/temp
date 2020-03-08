import { Component, OnInit, Renderer2 } from '@angular/core';
import { CursosService } from '../../../../services/cursos.service';
import { cursoModel } from '../../../../models/cursos/cursos.model';
import { tareasModel } from '../../../../models/clases/tareas.model';
import { TareasService } from '../../../../services/tareas.service';
import Swal from 'sweetalert2';
import { FormGroup,FormControl, Validators, NgForm, FormArray } from '@angular/forms';

@Component({
  selector: 'app-tareas',
  templateUrl: './tareas.component.html',
  styleUrls: ['./tareas.component.scss']
})
export class TareasComponent implements OnInit {

  public loading:Boolean = false
  /**seccion modulo de adjuntos */

  public cursos: cursoModel[] = []
  public selectedCurso: string = ''
  public tareas: any = []
  public selectedTarea: string = ''
  public tarea: any = []
  public totalAdjunto: number


  /**seccion modulo de tareas */
  public selectedCursoP: string = ''
  public cursosP: any = []
  public tareaP: any = []
  public min: Date = new Date()


  /**seccion para el modal de registro */
  public selectedCursoReg: string = ''
  public cursosReg: any = []

  public formcal:FormGroup

  constructor(
    private _cursoService: CursosService,
    private _tareaService: TareasService,
    private _render: Renderer2
  ) {
    this.formcal =  new FormGroup({
      notas: new FormArray([])
    })

   }

  ngOnInit() {
    this.cargarCursos()
    this.cargarCursosP()
    this.cargarCursosReg()
  }

  cargarCursos() {
    this.loading = true
    this._cursoService.cargarCursoProfesor()
      .subscribe((data: any) => {
        this.cursos = data.curso
        this.loading = false
      },()=> this.loading = false)
  }

  cargarCursosReg() {
    this.loading = true
    this._cursoService.cargarCursoProfesor()
      .subscribe((data: any) => {
        this.cursosReg = data.curso
        this.loading = false
      },()=>this.loading = false)
  }

  cargarCursosP() {
    this.loading = true
    this._cursoService.cargarCursoProfesor()
      .subscribe((data: any) => {
        this.cursosP = data.curso
        this.loading = false
      },()=>this.loading = false)
  }

  cargarTareas() {

    if (!this.selectedCurso) {
      return Swal.fire({
        title: 'Advertencia!',
        text: 'debes seleccionar un curso',
        icon: 'warning'
      })
    }
    
    this.loading = true

    this._tareaService.cargarTareaPorCurso(this.selectedCurso)
      .subscribe(data => {
        this.tareas = data
        this.loading = false
      },()=> this.loading = false)
  }

  cargarTareasP() {

    if (!this.selectedCursoP) {
      return Swal.fire({
        title: 'Advertencia!',
        text: 'debes seleccionar un curso',
        icon: 'warning'
      })
    }

    this.loading = true
    this._tareaService.cargarTareaPorCurso(this.selectedCursoP)
      .subscribe(data => {
        this.tareaP = data
        this.loading = false
      },()=>this.loading = false)
  }

  cargarAdjuntos() {
    if (!this.selectedTarea) {
      return Swal.fire({
        title: 'Advertencia!',
        text: 'debes seleccionar una tarea',
        icon: 'warning'
      })
    }

    
    this.loading = true
    this._tareaService.cargarTareaPorid(this.selectedTarea)
      .subscribe(data => {
        console.log(data);
        (<FormArray> this.formcal.get('notas')).clear()

        for (const item of data.tarea.extendedProps.adjunto) {
          (<FormArray> this.formcal.get('notas')).push(new FormControl(item.nota))
        }

        this.tarea = data.tarea
        this.loading = false
      },()=> this.loading = false)
  }

  editarTarea(tarea: any) {

    this.loading = true
    this._tareaService.actualizarTarea(tarea)
      .subscribe( (data:any) => {

        Swal.fire({
          title: 'Completado!',
          text: data,
          icon: 'success'
        })
        this.loading = false
      }, ()=>this.loading =false )
  }

  eliminarTarea(tarea: any) {


    Swal.fire({
      title: "Estas Seguro?",
      text: `Confirama que deseas eliminar la tarea '`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Continuar"
    }).then(data => {
      if (data.value) {

        this.loading = true
        this._tareaService.eliminarTarea(tarea._id)
          .subscribe(data => {
            Swal.fire({
              title: 'Completado!',
              text: data,
              icon: 'success'
            })
            this.cargarTareasP()
            this.loading = false
          },()=>this.loading= false)
      }
    });


  }

  agregarTarea(form: NgForm, modal: any) {

    if (form.invalid || !this.selectedCursoReg) {
      return Swal.fire({
        title: "Advertencia!",
        text: "formulario invalido, rellena todos los campos!",
        icon: "warning",
        confirmButtonText: "Cool"
      });
    }
    this.loading = true
    this._tareaService.agregarTarea(form.value, this.selectedCursoReg)
      .subscribe(data => {
        this.cerrarModal(modal)
        Swal.fire({
          title: 'Completado!',
          text: data,
          icon: 'success'
        })
        this.loading = false
      },()=>this.loading = false)
  }

  cerrarModal(modal: any) {
    this._render.removeClass(modal, 'showModal')
  }

  mostrarModal(modal: any) {
    this._render.addClass(modal, 'showModal')
  }


  calificacion(pos:number,tarea:any,adjunto:any){

    if(<FormArray> this.formcal.get('notas')['controls'][pos].invalid){
      return  Swal.fire({
        title: 'Calificacion no archivada!',
        text: 'Define una una calificacion',
        icon: 'warning'
      })
    }

    let calificaciones = {
      nota: this.formcal.value.notas[pos],
      tarea: tarea._id,
      adjunto: adjunto._id
    }

    this.loading = true
    this._tareaService.calificacion(calificaciones)
      .subscribe(
        (data:any) => {
          Swal.fire({
            title: 'Proceso Completado',
            text: data.message,
            icon: 'success'
          })
          this.loading = false
        },()=>this.loading = false
      )
  }
}
