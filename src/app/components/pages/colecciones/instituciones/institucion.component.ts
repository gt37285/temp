import { Component, OnInit, Renderer2 } from '@angular/core';
import { InstitucionService } from 'src/app/services/instituciones.service';
import InstitucionModel from '../../../../models/cursos/institucion.model';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { ModalService } from '../../../../services/modal.service';
//import { window } from 'rxjs/operators';


@Component({
  selector: 'app-institucion',
  templateUrl: './institucion.component.html',
  styleUrls: ['./institucion.component.scss', '../colecciones.component.scss']
})

export class InstitucionComponent implements OnInit {


  public instituciones: InstitucionModel[]
  public total: number
  private desde: number = 0
  public loading: boolean = false
  private modal1: any
  private agregar1: any

  constructor(
    private servicio: InstitucionService,
    private modalService: ModalService,
    private render: Renderer2
  ) { }

  ngOnInit(): void {
    this.listar()
    this.modalService.notificacion.subscribe(data => this.listar());

    window.addEventListener("resize", e => {
      if (window.innerWidth > 900) {

        if (this.modal1 && this.agregar1) {
          this.render.removeClass(this.modal1, "modal")
          this.render.removeClass(this.agregar1, "showModal")
        }
      }
    })
  }

  cambiardesde(valor: number) {
    let desde = this.desde + valor;

    if (desde < 0 || desde > this.total) return;

    this.desde += valor;

    this.listar();
  }

  buscar(termino: string) {
    if (termino == "" || termino == null) {
      return this.listar();
    } else {
      this.servicio.buscar(termino)
        .subscribe((data: any) => (this.instituciones = data));
    }
  }

  listar() {
    this.loading = true
    this.servicio.listar(this.desde)
      .subscribe((data: any) => {
        this.loading = false
        this.total = data.total-1
        this.instituciones = data.instituciones
      })
  }

  agregar(form: NgForm) {

    if (form.invalid) {
      return Swal.fire({
        title: 'Alerta!',
        text: 'formulario Invalido',
        icon: 'warning'
      })
    }

    let institicion: InstitucionModel = form.value


    if(institicion.nombre.toLocaleLowerCase()  == 'no definido'){
      institicion.nombre = 'No definido'
      institicion.admin = true
    }

    if (!institicion.dir_calle_principal) { institicion.dir_calle_principal = "No definido" }
    if (!institicion.dir_calle_secundaria) { institicion.dir_calle_secundaria = "No definido" }
    if (!institicion.dir_num) { institicion.dir_num = "No definido" }

    this.servicio.agregar(institicion)
      .subscribe((data: any) => {
        this.listar()
        if (this.agregar1 && this.modal1) {
          this.render.removeClass(this.modal1, "modal")
          this.render.removeClass(this.agregar1, "showModal")
        }
        Swal.fire({
          title: 'Completado',
          text: data.message,
          icon: 'success'
        })
      })
  }


  actualizar(institucion: InstitucionModel) {
    this.servicio.actualizar(institucion, institucion._id).subscribe(data => {
      this.listar();
      Swal.fire({
        title: "Success",
        text: `Institucion actualizada correctamente'`,
        icon: "success",
        confirmButtonText: "Cool"
      });
    });
  }

  eliminar(institucion: InstitucionModel) {
    Swal.fire({
      title: "Estas Seguro?",
      text: `Confirama que deseas eliminar la institucion?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Continuar"
    }).then(data => {
      if (data.value) {
        Swal.fire(
          "Proceso completado!",
          `la institucion ha sido eliminada`,
          "success"
        );

        this.servicio.eliminar(institucion._id).subscribe(data => {
          this.desde = 0;
          this.listar();
        });
      }
    });
  }


  mostrarModal(institucion: InstitucionModel) {
    this.modalService.showModal = {
      mostrar: false,
      tipo: "institucion",
      data: institucion
    };
  }

  cerrarModal() {
    this.modalService.showModalAdd = true;
  }

  show(agregar1: any, modal1: any) {
    this.render.addClass(agregar1, "showModal")
    this.render.addClass(modal1, "modal")
    this.modal1 = modal1
    this.agregar1 = agregar1
  }

  ocularModal() {

    if (this.agregar1 && this.modal1) {
      this.render.removeClass(this.modal1, "modal")
      this.render.removeClass(this.agregar1, "showModal")
    }
  }

}
