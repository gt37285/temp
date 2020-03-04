import { Component, OnInit } from '@angular/core';
import Swal from "sweetalert2";
import { NgForm } from '@angular/forms';
import { cursoModel } from '../../../../models/cursos/cursos.model';
import { CursosService } from '../../../../services/cursos.service';
import { ModalService } from '../../../../services/modal.service';
import { UsuariosService } from '../../../../services/usuarios.service';
import { ModulesModel } from '../../../../models/clases/modulos.model';
import { ModuloProfService } from '../../../../services/modulo-prof.service';


@Component({
  selector: 'app-modulos',
  templateUrl: './modulos.component.html',
  styleUrls: ['./modulos.component.scss','../gestion.component.scss']
})

export class ModulosProfComponent implements OnInit {

  /**definiciones para el modulo */

  public modulos: ModulesModel[] = []
  public totalModulos: number = 0;
  public selectedCursoMdl: string = ''
  public selectedCursoMdlReg: string = ''
  public desdePrevMdl: number = 0;
  public desdeNextMdl: number = 7;
  public loading: boolean = false;
  private desde: number = 0;
  public cursos: cursoModel[] = []
  public modalDatosDescripcion: any = null

  constructor(
    private _service: CursosService,
    public _serviceModal: ModalService,
    private _serviceMdl: ModuloProfService,
    private _userService: UsuariosService
  ) { }

  ngOnInit() {
    this.loading = false;
    this.desde = 0;
    this.cargarCursos()
    this._serviceModal.notificacion.subscribe(data => this.cargarCursos());
  }


  cargarCursos() {
    this.loading = true;
    this._service.cargarCursoProfesorall()
      .subscribe(data => {
        this.loading = false;
        this.cursos = data.data
      })
  }


  /**seccion de modulos */


  cargarModulos() {

    if (!this.selectedCursoMdl) {
      return Swal.fire({
        title: "Advertencia!",
        text: "Debes seleccionar un curso",
        icon: "warning",
        confirmButtonText: "Cool"
      });
    }

    this.loading = true;
    this._serviceMdl.cargarModulos(this.selectedCursoMdl)
      .subscribe(data => {
        this.loading = false;
        this.totalModulos = data.total
        this.modulos = data.modulos
      })
  }

  crearModulo(form: NgForm) {


    if (form.invalid || !this.selectedCursoMdlReg) {
      return Swal.fire({
        title: "Advertencia!",
        text: "formulario invalido, rellena todos los campos!",
        icon: "warning",
        confirmButtonText: "Cool"
      });
    }

    const model: ModulesModel = form.value

    this._serviceMdl.crearModulo(model, this.selectedCursoMdlReg)
      .subscribe((data: any) => {
        this.cargarModulos()
        Swal.fire({
          title: "Completado!",
          text: data,
          icon: "success",
          confirmButtonText: "Cool"
        })
        form.reset()
        this.selectedCursoMdlReg = ''
      })


    form.reset()
  }


  cambiardesdeMdlPrev(prev: number) {


    if (this.desdePrevMdl <= 0) return

    this.desdePrevMdl += prev
    this.desdeNextMdl = this.desdePrevMdl + 7

    this.cargarModulos()
  }


  cambiardesdeMdlNext(next: number) {

    if (this.desdePrevMdl < 0 || this.desdeNextMdl > this.totalModulos) return

    this.desdeNextMdl += next
    this.desdePrevMdl = this.desdeNextMdl - 7

    this.cargarModulos()
  }



  eliminarMdl(modulo: ModulesModel) {
    
    Swal.fire({
      title: "Estas Seguro?",
      text: `Confirma que deseas eliminar el modulo.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Continuar"
    }).then(data => {
      if (data.value) {

        this._serviceMdl.eliminarModulo(modulo, this.selectedCursoMdl)
          .subscribe((data: any) => {

            Swal.fire({
              title: "Proceso Completado!",
              text: `el modulo ha sido eliminado`,
              icon: "success",
              confirmButtonText: "Cool"
            })

            this.cargarModulos()
          })
      }
    });
  }


  actualizarMdl(modulo: ModulesModel) {


    this._serviceMdl.actualizarModulo(modulo, this.selectedCursoMdl)
      .subscribe(data => {
        Swal.fire({
          title: "Completado!",
          text: data,
          icon: "success",
          confirmButtonText: "Cool"
        });
      })
  }

  modal(tipo: string, data: any) {
    this._serviceModal.showModalAdd = false;
    data.tipo = tipo
    this.modalDatosDescripcion = data
  }

  actualizar(form: NgForm) {

    if (form.invalid || form.value.descripcion.trim() == "") {
      return Swal.fire({
        title: "Error!",
        text: "El formulario es invalido",
        icon: "warning",
        confirmButtonText: "Cool"
      });
    }

    let modelo = this.modalDatosDescripcion
    modelo.descripcion = form.value.descripcion

    delete modelo.tipo
    this.actualizarMdl(modelo)

    this._serviceModal.showModalAdd = true;
    this.modalDatosDescripcion = null

  }

  cerrarModal() {
    this._serviceModal.showModalAdd = true;
  }



}
