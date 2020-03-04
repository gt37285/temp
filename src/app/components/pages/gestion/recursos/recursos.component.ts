import { Component, OnInit } from '@angular/core';
import { recursoModel } from '../../../../models/clases/recurso.model';
import { RecursosProfService } from '../../../../services/recursos-prof.service';
import { ModuloProfService } from '../../../../services/modulo-prof.service';
import { UsuariosService } from '../../../../services/usuarios.service';
import { ModalService } from '../../../../services/modal.service';
import { CursosService } from '../../../../services/cursos.service';
import { cursoModel } from '../../../../models/cursos/cursos.model';
import { ModulesModel } from '../../../../models/clases/modulos.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-recursos',
  templateUrl: './recursos.component.html',
  styleUrls: ['./recursos.component.scss','../gestion.component.scss']
})
export class RecursosComponent implements OnInit {

  /**definiciones para los recursos */

  public recursos: recursoModel[] = []
  public totalRecursos: number = 0

  public selectedCurso: string = ''
  public selectedMdl:string = ''

  public desdePrevRec: number = 0
  public desdeNextRec: number = 8
  public archivo: File
  public cursos: cursoModel[] = []
  public modulos: ModulesModel[] = []
  public modalDatosDescripcion: any = null

  public loading:boolean = false

  constructor(
    private _service: CursosService,
    public _serviceModal: ModalService,
    private _userService: UsuariosService,
    private _serviceMdl: ModuloProfService,
    private _serviceRec: RecursosProfService
  ) { }

  ngOnInit() {
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

  cargarModulos() {


    if (!this.selectedCurso) {
      return Swal.fire({
        title: "Advertencia!",
        text: "Debes seleccionar un curso",
        icon: "warning",
        confirmButtonText: "Cool"
      });
    }

    this.loading = true;
    this._serviceMdl.cargarModulos(this.selectedCurso)
      .subscribe(data => {
        this.loading = false;
        this.modulos = data.modulos
      })
  }


  /**seccion para los recursos */

  cargarRecursos() {

    if (!this.selectedMdl) {
      return Swal.fire({
        title: "Advertencia!",
        text: "Debes seleccionar un modulo",
        icon: "warning",
        confirmButtonText: "Cool"
      });
    }

    this.loading = true;

    let idmodulo = this.selectedMdl
    let idcurso = this.selectedCurso

    this._serviceRec.cargarRecursos(idcurso, idmodulo)
      .subscribe((data: any) => {
        this.loading = false;
        this.totalRecursos = data.total
        this.recursos = data.recursos
      })
  }
 


  cambiardesdeRecPrev(prev: number) {


    if (this.desdePrevRec <= 0) return

    this.desdePrevRec += prev
    this.desdeNextRec = this.desdePrevRec + 8



    this.cargarRecursos()
  }


  cambiardesdeRecNext(next: number) {

    console.log(next)

    if (this.desdePrevRec < 0 || this.desdeNextRec > this.totalRecursos) return

    this.desdeNextRec += next
    this.desdePrevRec = this.desdeNextRec - 8


    this.cargarRecursos()
  }



  eliminarRecurso(recurso: recursoModel) {


    let idmodulo = this.selectedMdl
    let idcurso = this.selectedCurso

    if (!idmodulo || !idcurso) {
      return Swal.fire({
        title: "Advertencia!",
        text: "Debes seleccionar un modulo y un curso",
        icon: "warning",
        confirmButtonText: "Cool"
      });
    }
    
      Swal.fire({
        title: "Estas Seguro?",
        text: `Confirma que deseas eliminar el recurso seleccionado`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Continuar"
      }).then(data => {
        if (data.value) {
          this.loading = true
          this._serviceRec.aliminarRecurso(idmodulo, recurso._id, idcurso)
              .subscribe((data: any) => {
                Swal.fire({
                  title: "Completado!",
                  text: data.message,
                  icon: "success",
                  confirmButtonText: "Cool"
                })

                this.cargarRecursos()
              })
        }
      });
  }

  seleccionArchivo(file: File) {
    if (!file) {
      return;
    }

    this.archivo = file

  }

  cargarArchivo() {
    if (!this.archivo) {
      return;
    }

    let idmodulo = this.selectedMdl
    let idcurso = this.selectedCurso

    if (!idmodulo || !idcurso) {
      return Swal.fire({
        title: "Advertencia!",
        text: "Debes seleccionar un modulo y un curso",
        icon: "warning",
        confirmButtonText: "Cool"
      });
    }

    this._serviceRec.subirArchivo(this.archivo, 'recursos', idmodulo, idcurso)
      .then((data: any) => {

        console.log(data);
        Swal.fire({
          title: "Completado!",
          text: data.message,
          icon: "success",
          confirmButtonText: "Cool"
        })

        this.archivo = null

        this.cargarRecursos()
      })
      .catch(err => {
        Swal.fire({
          title: "Error!",
          text: err.message,
          icon: "error",
          confirmButtonText: "Cool"
        })
      })

  }
}
