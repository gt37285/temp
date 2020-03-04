import { Component, OnInit } from '@angular/core';
import { claseModel } from '../../../../models/clases/clase.model';
import { ModalService } from '../../../../services/modal.service';
import { UsuariosService } from '../../../../services/usuarios.service';
import { CursosService } from '../../../../services/cursos.service';
import { cursoModel } from '../../../../models/cursos/cursos.model';
import { ModuloProfService } from '../../../../services/modulo-prof.service';
import { ModulesModel } from '../../../../models/clases/modulos.model';
import Swal from 'sweetalert2';
import { ClasesProfService } from '../../../../services/clases-prof.service';
import { NgForm } from '@angular/forms';

@Component({
    selector: 'app-clase',
    templateUrl: './clases.component.html',
    styleUrls: ['./clases.component.scss','../gestion.component.scss']
})

export class ClaseComponent implements OnInit{

    /**definiciones para las clases */

    public clases: claseModel[] = []
    public totalClases: number = 0
    public selectedCursoMdlCls: string = ''
    public selectedMdlCls: string = ''
    public selectedMdlClsReg: string = ''
    public desdePrevCls: number = 0
    public desdeNextCls: number = 8
    public loading: boolean = false
    public cursos: cursoModel[] = []
    public selectedCursoMdl: string = ''
    public modulos: ModulesModel[] = []
    public selectedCursoMdlReg: string = ''
    public selectedCursClsReg: string = ''
    public modalDatosDescripcion: any = null




    constructor(
        public _serviceModal: ModalService,
        private _cursoService: CursosService,
        private _serviceMdl: ModuloProfService,
        private _serviceCls: ClasesProfService,
    ) { }
    
    ngOnInit(): void {
        this.cargarCursos()
        this._serviceModal.notificacion.subscribe(data => this.cargarCursos());
    }

    cargarCursos() {
        this.loading = true;
        this._cursoService.cargarCursoProfesorall()
            .subscribe(data => {
                this.loading = false;
                this.cursos = data.data
            })
    }

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
                this.modulos = data.modulos
            })
    }


    cargarModulosReg() {

        if (!this.selectedCursClsReg) {
            return Swal.fire({
                title: "Advertencia!",
                text: "Debes seleccionar un curso",
                icon: "warning",
                confirmButtonText: "Cool"
            });
        }

        this.loading = true;
        this._serviceMdl.cargarModulos(this.selectedCursClsReg)
            .subscribe(data => {
                this.loading = false;
                this.modulos = data.modulos
            })
    }

    /** seccion de clases  */



    cargarClases() {

        if (!this.selectedMdlCls) {
            return Swal.fire({
                title: "Advertencia!",
                text: "Debes seleccionar un modulo",
                icon: "warning",
                confirmButtonText: "Cool"
            });
        }

        this.loading = true;

        let idmodulo = this.selectedMdlCls
        let idcurso = this.selectedCursoMdl

        this._serviceCls.cargarClases(idmodulo, idcurso)
            .subscribe((data: any) => {
                this.loading = false;
                this.totalClases = data.total
                this.clases = data.clases
            })
    }

    crearClase(form: NgForm) {


        if (form.invalid || !this.selectedCursClsReg) {
            return Swal.fire({
                title: "Advertencia!",
                text: "formulario invalido.",
                icon: "warning",
                confirmButtonText: "Cool"
            });
        }

        const model: claseModel = form.value
        model.modulo = this.selectedMdlClsReg
        let id_curso = this.selectedCursClsReg


        this._serviceCls.crearClase(model, id_curso)

            .subscribe((data: any) => {
                Swal.fire({
                    title: "Completado!",
                    text: data,
                    icon: "success",
                    confirmButtonText: "Cool"
                })
                this.selectedCursoMdlReg = ''
            })


        form.reset()
    }


    cambiardesdeClsPrev(prev: number) {

        if (this.desdePrevCls <= 0) return

        this.desdePrevCls += prev
        this.desdeNextCls = this.desdePrevCls + 8


        this.cargarModulos()
    }


    cambiardesdeClsNext(next: number) {

        if (this.desdePrevCls < 0 || this.desdeNextCls > this.totalClases) return

        this.desdeNextCls += next
        this.desdePrevCls = this.desdeNextCls - 8

        this.cargarModulos()
    }



    eliminarClase(clase: claseModel) {

        let idmodulo = this.selectedMdlCls
        let idcurso = this.selectedCursoMdl

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
            text: `Confirma que deseas eliminar la clase seleccionada.`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Continuar"
          }).then(data => {
            if (data.value) {
        
                this._serviceCls.eliminarClase(clase._id, idmodulo, idcurso)
                    .subscribe((data: any) => {
        
                        Swal.fire({
                            title: "Completado!",
                            text: data,
                            icon: "success",
                            confirmButtonText: "Cool"
                        })
        
                        this.cargarClases()
                    })
            }
          });


    }


    actualizarClase(clase: claseModel) {

        let idmodulo = this.selectedMdlCls
        let idcurso = this.selectedCursoMdl

        clase.modulo = idmodulo


        Swal.fire({
            title: "Estas Seguro?",
            text: `Confirma que deseas actualizar la clase seleccionada`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Continuar"
        }).then(data => {
            if (data.value) {
            
                this._serviceCls.actualizarClase(clase, idcurso)
                    .subscribe(data => {
                        Swal.fire({
                            title: "Completado!",
                            text: data,
                            icon: "success",
                            confirmButtonText: "Cool"
                        });
                    })
            }
        });

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
        this.actualizarClase(modelo)

        this._serviceModal.showModalAdd = true;
        this.modalDatosDescripcion = null

    }


    cerrarModal() {
        this._serviceModal.showModalAdd = true;
    }
}