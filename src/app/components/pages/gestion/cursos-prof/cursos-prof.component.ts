import { Component, OnInit, ElementRef } from '@angular/core';
import { cursoModel } from '../../../../models/cursos/cursos.model';
import { CursosService } from '../../../../services/cursos.service';
import { ModalService } from '../../../../services/modal.service';
import { UsuariosService } from '../../../../services/usuarios.service';
import Swal from "sweetalert2";
import { NgForm } from '@angular/forms';
import { ModulesModel } from '../../../../models/clases/modulos.model';
import { claseModel } from '../../../../models/clases/clase.model';
import { ModuloProfService } from '../../../../services/modulo-prof.service';
import { ClasesProfService } from '../../../../services/clases-prof.service';
import { recursoModel } from '../../../../models/clases/recurso.model';
import { RecursosProfService } from '../../../../services/recursos-prof.service';
import { ObjetivoModel } from '../../../../models/cursos/objetivos.model';
import { ObjetivosService } from '../../../../services/objetivos.service';
import { requerimentosService } from '../../../../services/requerimentos.service';
import { requerimentoModel } from '../../../../models/cursos/requerimentos.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cursos-prof',
  templateUrl: './cursos-prof.component.html',
  styleUrls: ['./cursos-prof.component.scss','../gestion.component.scss']
})

export class CursosProfComponent implements OnInit {

  /**definiciones para el curso */

  public loading: boolean = true;
  public cursos: cursoModel[] = []
  public totalCursos: number = 0
  public desde: number = 0
  public modalDatosDescripcion: any = null
  public dificultad: string[] = []
  public selectedDificultad:string = ''
  public selectedDificultadReg:string = ''

  /**definiciones para los objetivos */

  public objetivos: ObjetivoModel[] = []
  public totalObjetivos: number = 0
  public selectedCursoObj: string = ''
  public selectedCursoObjReg: string = ''
  public cursosAux:cursoModel[] = []
  

  /**definiciones para los requerimentos */

  public requisitos: ObjetivoModel[] = []
  public totalRequisitos: number = 0
  public selectedCursoReq: string = ''
  public selectedCursoReqReg:string = ''
  

  constructor(
    private _service: CursosService,
    public _serviceModal: ModalService,
    private _userService: UsuariosService,
    private _objetivoService: ObjetivosService,
    private _requisitoService: requerimentosService,
    private router:Router
  ) { 

    this.dificultad = ['bajo','medio','alto']
  }

  ngOnInit() {
    this.cargarCursos()
    this._serviceModal.notificacion.subscribe(data => this.cargarCursos());
  }


  /**esta funcion esta pendiente, se debe realizar la busqueda en el frontend, no consultar al backend */

  buscarCurso(termino: string) {
    if (termino == "" || termino == null) {
      return this.cargarCursos();
    } else {
      this.loading = true;
      this._service.buscarCursos(termino).subscribe((data: any) => {
        this.loading = false;
        this.cursos = data;
      });
    }
  }

  cargarCursos() {
    this.loading = true;
    this._service.cargarCursoProfesor(this.desde)
      .subscribe(data => {
        this.loading = false;
        this.totalCursos = data.total
        this.cursos = data.curso
      })
  }

  cambiardesde(valor: number) {
    let aux = this.desde + valor

    if (aux < 0 || aux > this.totalCursos) return

    this.desde = aux

    this.cargarCursos()
  }

  mostrarModal(curso: cursoModel) {

    this._serviceModal.showModal = {
      mostrar: false,
      tipo: "cursos",
      data: curso
    };
  }

  cerrarModal() {
    this._serviceModal.showModalAdd = true;
  }


  eliminarCurso(curso: cursoModel) {
    
    Swal.fire({
      title: "Estas Seguro?",
      text: `Confirma que deseas eliminar el curso.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Continuar"
    }).then(data => {
      if (data.value) {

        this.loading = true
        this._service.eliminarCurso(curso)
          .subscribe((data: any) => {
            this.loading = false
            Swal.fire({
              title: "Completado!",
              text: data.message,
              icon: "success",
              confirmButtonText: "Cool"
            })

            this.cargarCursos()
          }, (err) => this.loading = false)
      }
    });
  }

  crearCurso(form: NgForm) {

    if (!this.selectedDificultad) {
      return Swal.fire({
        title: 'Advertencia!',
        text: 'Debes selecionar una dificultad',
        icon: 'warning'
      })
    }

    let model:cursoModel = form.value
    model.usuario = this._userService.user
    model.dificultad = this.selectedDificultad

    this._service.crearCurso(model)
      .subscribe((data: any) => {
        Swal.fire({
          title: "Completado!",
          text: data.message,
          icon: "success",
          confirmButtonText: "Cool"
        })
        this.selectedDificultad = ''
        this.cargarCursos()
      })
    form.reset()
  }

  actualizarCurso(dataCurso: any) {
   
    Swal.fire({
      title: "Estas Seguro?",
      text: `Confirma que deseas actualizar el curso.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Continuar"
    }).then(data => {
      if (data.value) {
        this.loading = true
        this._service.actualizarCurso(dataCurso)
          .subscribe(data => {
            this.loading = false
            Swal.fire({
              title: "Completado!",
              text: "Se actualizo el curso correctamente!",
              icon: "success",
              confirmButtonText: "Cool"
            });
            this.cargarCursos()
          }, (err) => this.loading = false
        )
      }
    });
  }

  /**el modal de actualizar es universal para todos los campos, es necesario proveer el tipo de campo */


  modal(tipo: string, data: any) {
    this._serviceModal.showModalAdd = false;
    data.tipo = tipo
    this.modalDatosDescripcion = data
  }

  actualizar(form: NgForm) {

    if (form.invalid) {
      return Swal.fire({
        title: "Error!",
        text: "El formulario es invalido",
        icon: "warning",
        confirmButtonText: "Cool"
      });
    }

    if (!this.selectedDificultadReg) {
      return Swal.fire({
        title: 'Advertencia!',
        text: 'Debes selecionar una dificultad',
        icon: 'warning'
      })
    }

    let modelo = this.modalDatosDescripcion
    modelo.nombre = form.value.nombre
    modelo.descripcion = form.value.descripcion
    modelo.dificultad = this.selectedDificultadReg


    delete modelo.tipo
    this.actualizarCurso(modelo)
    
    
    this._serviceModal.showModalAdd = true;
    this.modalDatosDescripcion = null

  }

  /**seccion para los objetivos */
  
  listarObjetivos() {

    if (!this.selectedCursoObj) {
      return Swal.fire({
        title: 'Alerta',
        text: 'debes seleccionar un curso',
        icon: 'success'
      })
    }
    this.loading = true

    this._objetivoService.listarObjetivos(this.selectedCursoObj)
      .subscribe(
        (data => {
          this.totalObjetivos = data.length
          this.objetivos = data
          this.loading = false
        }),
        (err =>  this.loading = false
      )
    )
  }

  actualizarObj(objetivo: ObjetivoModel) {

    if (!this.selectedCursoObj) {
      return Swal.fire({
        title: 'Alerta',
        text: 'debes seleccionar un curso',
        icon: 'success'
      })
    }

    Swal.fire({
      title: "Estas Seguro?",
      text: `Confirma que deseas actulizar el objetivo`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Continuar"
    }).then(data => {
      if (data.value) {
        this.loading = true
        this._objetivoService.actualizarObjetivo(objetivo,this.selectedCursoObj)
          .subscribe(data => {
            this.loading = false
            Swal.fire({
              title: "Completado!",
              text: "Se actualizo el objetivo correctamente!",
              icon: "success",
              confirmButtonText: "Cool"
            });
          }, (err) => this.loading = false
          )
      }
    });
  }

  eliminarObj(objetivo: ObjetivoModel) {
    if (!this.selectedCursoObj) {
      return Swal.fire({
        title: 'Alerta',
        text: 'debes seleccionar un curso',
        icon: 'success'
      })
    }

    Swal.fire({
      title: "Estas Seguro?",
      text: `Confirma que deseas eliminar el objetivo`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Continuar"
    }).then(data => {
      if (data.value) {
        this.loading = true
        this._objetivoService.eliminarObjetivos(this.selectedCursoObj,objetivo._id)
          .subscribe(data => {
            this.loading = false
            Swal.fire({
              title: "Completado!",
              text: "Se elimino el objetivo correctamente!",
              icon: "success",
              confirmButtonText: "Cool"
            });
            this.listarObjetivos()
          },
            (err) => this.loading = false
          )
      }
    });
  }

  registrarObj(form: NgForm) {
    if (form.invalid) {
      return Swal.fire({
        title: 'Alerta!',
        text: 'formulario Invalido',
        icon: 'warning'
      })
    }

    if (!this.selectedCursoObjReg) {
      return Swal.fire({
        title: 'Alerta',
        text: 'debes seleccionar un curso',
        icon: 'warning'
      })
    }

    let objetivo: ObjetivoModel = form.value
    this.loading = true
    
    this._objetivoService.agregarObjetivo(objetivo, this.selectedCursoObjReg)
      .subscribe(data => {
        this.loading = false
        Swal.fire({
          title: "Completado!",
          text: "Se agrego el objetivo correctamente!",
          icon: "success",
          confirmButtonText: "Cool"
        });
        form.reset()
      },
        (err) => this.loading = false
      )
  }

  /**seccion para los requisitos */
  
  listarRequisitos() {

    if (!this.selectedCursoReq) {
      return Swal.fire({
        title: 'Alerta',
        text: 'debes seleccionar un curso',
        icon: 'success'
      })
    }
    this.loading = true

    this._requisitoService.listar(this.selectedCursoReq)
      .subscribe(
        (data => {
          this.totalRequisitos = data.length
          this.requisitos = data
          this.loading = false
        }),
        (err =>  this.loading = false
      )
    )
  }

  actualizarReq(requerimento: requerimentoModel) {

    if (!this.selectedCursoReq) {
      return Swal.fire({
        title: 'Alerta',
        text: 'debes seleccionar un curso',
        icon: 'success'
      })
    }

    Swal.fire({
      title: "Estas Seguro?",
      text: `Confirma que deseas actulizar el requerimento`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Continuar"
    }).then(data => {
      if (data.value) {
        this.loading = true
        this._requisitoService.actualizar(requerimento,this.selectedCursoReq)
          .subscribe(data => {
            console.log(data);
            this.loading = false
            Swal.fire({
              title: "Completado!",
              text: "Se actualizo el requerimento correctamente!",
              icon: "success",
              confirmButtonText: "Cool"
            });
          }, (err) => this.loading = false
          )
      }
    });
  }

  eliminarReq(requerimento: ObjetivoModel) {
    if (!this.selectedCursoReq) {
      return Swal.fire({
        title: 'Alerta',
        text: 'debes seleccionar un curso',
        icon: 'success'
      })
    }

    Swal.fire({
      title: "Estas Seguro?",
      text: `Confirma que deseas eliminar el requerimento`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Continuar"
    }).then(data => {
      if (data.value) {
        this.loading = true
        this._requisitoService.eliminar(this.selectedCursoReq,requerimento._id)
          .subscribe(data => {
            this.loading = false
            Swal.fire({
              title: "Completado!",
              text: "Se elimino el requerimento correctamente!",
              icon: "success",
              confirmButtonText: "Cool"
            });
            this.listarRequisitos()
          },
            (err) => this.loading = false
          )
      }
    });
  }

  registrarReq(form: NgForm) {
    if (form.invalid) {
      return Swal.fire({
        title: 'Alerta!',
        text: 'formulario Invalido',
        icon: 'warning'
      })
    }

    if (!this.selectedCursoReqReg) {
      return Swal.fire({
        title: 'Alerta',
        text: 'debes seleccionar un curso',
        icon: 'warning'
      })
    }

    let requisito: requerimentoModel = form.value
    this.loading = true
    
    this._requisitoService.agregar(requisito, this.selectedCursoReqReg)
      .subscribe(data => {
        this.loading = false
        Swal.fire({
          title: "Completado!",
          text: "Se agrego el requerimento correctamente!",
          icon: "success",
          confirmButtonText: "Cool"
        });
        form.reset()
      },
        (err) => this.loading = false
      )
  }

  objetivosredirect(curso:cursoModel){
    this.router.navigate(['/aula/prof/cursos/objetivosRequisitos/',curso._id])
  }

}
