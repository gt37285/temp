import { Component, OnInit, Renderer2 } from '@angular/core';
import { CursosService } from '../../../../services/cursos.service';
import { cursoModel } from '../../../../models/cursos/cursos.model';
import { tareasModel } from '../../../../models/clases/tareas.model';
import { TareasService } from '../../../../services/tareas.service';
import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-tareas',
  templateUrl: './tareas.component.html',
  styleUrls: ['./tareas.component.scss']
})
export class TareasComponent implements OnInit {

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

  constructor(
    private _cursoService: CursosService,
    private _tareaService: TareasService,
    private _render: Renderer2
  ) { }

  ngOnInit() {
    this.cargarCursos()
    this.cargarCursosP()
    this.cargarCursosReg()
  }

  cargarCursos() {
    this._cursoService.cargarCursoProfesor()
      .subscribe((data: any) => this.cursos = data.curso)
  }

  cargarCursosReg() {
    this._cursoService.cargarCursoProfesor()
      .subscribe((data: any) => this.cursosReg = data.curso)
  }

  cargarCursosP() {
    this._cursoService.cargarCursoProfesor()
      .subscribe((data: any) => this.cursosP = data.curso)
  }

  cargarTareas() {

    if (!this.selectedCurso) {
      return Swal.fire({
        title: 'Advertencia!',
        text: 'debes seleccionar un curso',
        icon: 'warning'
      })
    }


    this._tareaService.cargarTareaPorCurso(this.selectedCurso)
      .subscribe(data => this.tareas = data)
  }

  cargarTareasP() {

    if (!this.selectedCursoP) {
      return Swal.fire({
        title: 'Advertencia!',
        text: 'debes seleccionar un curso',
        icon: 'warning'
      })
    }


    this._tareaService.cargarTareaPorCurso(this.selectedCursoP)
      .subscribe(data => this.tareaP = data)
  }

  cargarAdjuntos() {
    if (!this.selectedTarea) {
      return Swal.fire({
        title: 'Advertencia!',
        text: 'debes seleccionar una tarea',
        icon: 'warning'
      })
    }

    this._tareaService.cargarTareaPorid(this.selectedTarea)
      .subscribe(data => {
        console.log(data)
        this.tarea = data.tarea
      })
  }

  editarTarea(tarea: any) {

    this._tareaService.actualizarTarea(tarea)
      .subscribe(data => Swal.fire({
        title: 'Completado!',
        text: data,
        icon: 'success'
      }))
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

        this._tareaService.eliminarTarea(tarea._id)
          .subscribe(data => {
            Swal.fire({
              title: 'Completado!',
              text: data,
              icon: 'success'
            })
            this.cargarTareasP()
          })
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

    this._tareaService.agregarTarea(form.value, this.selectedCursoReg)
      .subscribe(data => {
        this.cerrarModal(modal)
        Swal.fire({
          title: 'Completado!',
          text: data,
          icon: 'success'
        })
      })
  }

  cerrarModal(modal: any) {
    this._render.removeClass(modal, 'showModal')
  }

  mostrarModal(modal: any) {
    this._render.addClass(modal, 'showModal')
  }
}
