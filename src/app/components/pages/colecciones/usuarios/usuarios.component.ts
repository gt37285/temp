import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  Renderer2
} from "@angular/core";
import { UsuarioModel } from "../../../../models/usuarios/usuario.model";
import { UsuariosService } from "../../../../services/usuarios.service";
import Swal from "sweetalert2";
import { ModalService } from "../../../../services/modal.service";
import { NgForm } from "@angular/forms";
import InstitucionModel from '../../../../models/cursos/institucion.model';
import { InstitucionService } from '../../../../services/instituciones.service';

@Component({
  selector: "app-usuarios",
  templateUrl: "./usuarios.component.html",
  styleUrls: ["./usuarios.component.scss", "../colecciones.component.scss"]
})
export class UsuariosComponent implements OnInit {
  public usuarios: UsuarioModel[];
  private desde: number;
  public total: number;
  public loading: boolean;
  public selectedRol: string;
  public selectedGenero: string;
  public selectedInstitucion: string;
  public minDate: Date;
  public maxDate: Date;
  public instituciones:InstitucionModel[]
  // public maxDate: Date;

  constructor(
    public _service: UsuariosService,
    public _modalService: ModalService,
    private _render: Renderer2,
    private serviceInstitucion:InstitucionService
  ) {
    this.desde = 0;
    this.total = 0;
    this.loading = true;
    this.minDate = new Date(2000, 0, 1);
    this.minDate = new Date(2000, 0, 1);
    this.maxDate = new Date(new Date().getFullYear()-5, 0, 1);

    // this.maxDate = new Date(2020, 0, 1);
  }

  ngOnInit() {
    this.selectedGenero = "M";
    this.selectedRol = "EST_ROLE";
    this.cargarUsuarios();
    this.ListarInstituciones();
    this._modalService.notificacion.subscribe(data => this.cargarUsuarios());
  }

  cambiardesde(valor: number) {
    let desde = this.desde + valor;

    if (desde < 0 || desde > this.total) return;

    this.desde += valor;

    this.cargarUsuarios();
  }

  ListarInstituciones() {
    this.serviceInstitucion.listarall()
      .subscribe((data: any) => {
        this.instituciones = data.instituciones
      })
  }

  cargarUsuarios() {
    this.loading = true;
    this._service.cargarUsuarios(this.desde).subscribe((data: any) => {
      this.total = data.total - 1;
      this.usuarios = data.user;
      this.loading = false;
    });
  }

  buscarUsuario(termino: string) {
    if (termino == "" || termino == null) {
      return this.cargarUsuarios();
    } else {
      this._service
        .buscarUsuarios(termino)
        .subscribe((data: any) => (this.usuarios = data));
    }
  }

  delUsuario(user: UsuarioModel) {
    if (user._id === this._service.user._id) {
      return Swal.fire({
        title: "Advertencia!",
        text: "No se puede borrar el usuario actual!",
        icon: "warning",
        confirmButtonText: "Cool"
      });
    }

    Swal.fire({
      title: "Estas Seguro?",
      text: `Confirma que deseas eliminar el usuario.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Continuar"
    }).then(data => {
      if (data.value) {
        Swal.fire(
          "Proceso completado!",
          `el usuario ha sido eliminado`,
          "success"
        );

        this._service.borrarUsuario(user).subscribe(data => {
          this.desde = 0;
          this.cargarUsuarios();
        });
      }
    });
  }

  guardarUsuario(user: UsuarioModel) {
    if (user._id === this._service.user._id) {
      return Swal.fire({
        title: "Error!",
        text:
          "Si deseas actualizar la información del usuario activo, por favor cambiala en el perfil",
        icon: "warning",
        confirmButtonText: "Cool"
      });
    }



    Swal.fire({
      title: "Estas Seguro?",
      text: `Confirma que deseas actualizar el usuario.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Continuar"
    }).then(data => {
      if (data.value) {
        this._service.actualizarUsuario(user).subscribe(data => {
          this.cargarUsuarios();
          Swal.fire({
            title: "Success",
            text: `Usuario actualizado correctamente'`,
            icon: "success",
            confirmButtonText: "Cool"
          });
        });
      }
    });

    
  }

  mostrarModal(user: UsuarioModel) {
    if (user._id === this._service.user._id) {
      return Swal.fire({
        title: "Advertencia!",
        text:
          "Si deseas actualizar la imagen del usuario actual por favor cambiala en el perfil!",
        icon: "warning",
        confirmButtonText: "Cool"
      });
    }

    this._modalService.showModal = {
      mostrar: false,
      tipo: "usuarios",
      data: user
    };
  }

  cerrarModal() {
    this._modalService.showModalAdd = true;
  }

  addUser() {
    this._modalService.showModalAdd = false;
  }

  /**crea un nuevo usuario */

  enviarFormulario(form: NgForm) {
    if (form.invalid || !this.selectedInstitucion) {
      return Swal.fire({
        title: "Error!",
        text:
          "Formulario Invalido!. \nNo olvides seleccionar la institución.",
        icon: "warning",
        confirmButtonText: "Cool"
      });
    }

    let user: UsuarioModel;

    user = form.value;
    user.password = form.value.cedula
    user.genero = this.selectedGenero;
    user.rol = this.selectedRol;
    user.estado = true;
    user.institucion = this.selectedInstitucion


    this._service.crearUsuario(user).subscribe(data => {
      this.cargarUsuarios();
      this.cerrarModal();
      form.reset();
      Swal.fire({
        title: "Success!",
        text: data,
        icon: "success",
        confirmButtonText: "Cool"
      });
    });
  }
}
