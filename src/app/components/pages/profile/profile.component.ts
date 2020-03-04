import { Component, OnInit } from "@angular/core";
import { UsuariosService } from '../../../services/usuarios.service';
import { UsuarioModel } from "../../../models/usuarios/usuario.model";
import Swal from "sweetalert2";
import { NgForm, FormGroup, Validators, FormControl } from "@angular/forms";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"]
})
export class ProfileComponent implements OnInit {
  public selected: any;
  public usuario: UsuarioModel;
  public uploadImg: File;
  public formSecure: FormGroup;
  public imagenTemp: any;
  public minDate: Date;
  public maxDate: Date;
  public loading:boolean = false

  constructor(private _service: UsuariosService) {
    this.usuario = this._service.user;
    this.minDate = new Date(1990, 0, 1);
    this.maxDate = new Date(new Date().getFullYear()-5, 0, 1);
  }

  ngOnInit() {
    this.selected = "M";

    this.formSecure = new FormGroup(
      {
        email: new FormControl(this.usuario.email, [
          Validators.required,
          Validators.email
        ]),
        passwordAnt: new FormControl("", [
          Validators.required,
          Validators.minLength(8)
        ]),
        password: new FormControl("", [
          Validators.required,
          Validators.minLength(8)
        ]),
        password2: new FormControl("", [
          Validators.required,
          Validators.minLength(8)
        ])
      },
      { validators: this.validacionContraseña("password", "password2") }
    );
  }

  validacionContraseña(pass1: string, pass2: string) {
    return (group: FormGroup) => {
      let password = group.controls[pass1].value;
      let password2 = group.controls[pass2].value;
      let sonIguales = false;

      let mayuspass1 = false;
      let numpass1 = false;

      for (let i = 0; i < password.length; i++) {
        if (password.charCodeAt(i) >= 65 && password.charCodeAt(i) <= 90) {
          mayuspass1 = true;
        }
        if (password.charCodeAt(i) >= 48 && password.charCodeAt(i) <= 57) {
          numpass1 = true;
        }
      }

      if (password == password2) sonIguales = true;

      if (sonIguales && mayuspass1 && numpass1) {
        return null;
      }

      return {
        invalid: true
      };
    };
  }

  enviarFormPersonal(form: NgForm) {
    if (form.invalid) {
      Swal.fire({
        title: "Error!",
        text: "Formulario Invalido",
        icon: "error",
        confirmButtonText: "Cool"
      });
      return;
    }




    Swal.fire({
      title: "Estas Seguro?",
      text: `Confirma que deseas actualizar tu información`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Continuar"
    }).then(data => {
      if (data.value) {

        this.usuario.lugarNac = form.value.lugarNac;
        this.usuario.fechaNac = form.value.fechaNac;

        this._service.actualizarUsuarioAcual(this.usuario).subscribe((data: any) =>
          Swal.fire({
            title: data.user.nombre,
            text: data.message,
            icon: "success",
            confirmButtonText: "Cool"
          })
        );
      }
    });

   
  }

  seleccionimg(archivo: File) {
    if (!archivo) {
      return;
    }

    if (archivo.type.indexOf("image") < 0) {
      Swal.fire({
        title: "Error!",
        text: "Solo puedes subir imagenes",
        icon: "warning",
        confirmButtonText: "Cool"
      });
      this.uploadImg = null;
      return;
    }

    this.uploadImg = archivo;

    let reader = new FileReader();
    reader.readAsDataURL(archivo);
    reader.onloadend = () => (this.imagenTemp = reader.result);
  }

  cargarImg() {
    if (!this.uploadImg) {
      return;
    }
    this._service.cargarImg(this.uploadImg, this.usuario._id);
    this.uploadImg = null;
  }

  /**logica para el formulario de direcciones */

  enviarFormaDirecciones(form: NgForm) {
    if (form.invalid) {
      Swal.fire({
        title: "Error!",
        text: "Formulario Invalido",
        icon: "error",
        confirmButtonText: "Cool"
      });
      return;
    }


    Swal.fire({
      title: "Estas Seguro?",
      text: `Confirma que deseas actualizar tu información`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Continuar"
    }).then(data => {
      if (data.value) {

        this.usuario.ciudad = form.value.ciudad;
        this.usuario.callePrincipal = form.value.callePrincipal;
        this.usuario.calleSecundaria = form.value.calleSecundaria;
        this.usuario.numCasa = form.value.numCasa;
    
        this._service.actualizarUsuarioAcual(this.usuario).subscribe((data: any) =>
          Swal.fire({
            title: data.user.nombre,
            text: data.message,
            icon: "success",
            confirmButtonText: "Cool"
          })
        );
      }
    });

  }

  enviarFormaSecure() {

    
    if (this.formSecure.errors || this.formSecure.invalid) {
      return Swal.fire({
        title: "Error!",
        text: `verifica que la nueva contraseña sea igual en ambos campos, que tengan 8 caracteres minimo, una letra mayuscula y un digito`,
        icon: "warning",
        confirmButtonText: "Cool"
      });
    }


    Swal.fire({
      title: "Estas Seguro?",
      text: `Confirma que deseas actualizar tu contraseñá`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Continuar"
    }).then(data => {
      if (data.value) {

        this.usuario.email = this.formSecure.value.email;
        this.usuario.password = this.formSecure.value.password;
        this.usuario.passwordAnt = this.formSecure.value.passwordAnt;
    
        this.loading = true
    
        this._service.actualizarPassword(this.usuario)
          .subscribe((data: any) => {
              this.loading = false;
              Swal.fire({
                title: data.message,
                text: `tu contraseña ha sido actualizada, por seguridad se ha cerrado la sesion.`,
                icon: 'success'
              })
              this.formSecure.reset
            this._service.logout()
            this.loading = false
          },
          (err) => {
            this.loading = false;
          }
        );
      }
    });

    
   
  }

  cambiarEmail(form:NgForm) {
    
    if (form.invalid) {
      return Swal.fire({
        title: "El formulario es invalido.",
        text: `verifica que todos los campos esten correctos.`,
        icon: "warning",
        confirmButtonText: "Cool"
      });
    }



    Swal.fire({
      title: "Estas Seguro?",
      text: `Confirma que deseas cambiar tu email`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Continuar"
    }).then(data => {
      if (data.value) {
        let usuario: UsuarioModel = form.value
        this.loading = true
    
        this._service.actualizarEmail(usuario)
          .subscribe((data: any) => {
          this.loading = false;
          
            Swal.fire({
              title: data.message,
              text: `tu email ha sido actualizado, por seguridad se ha cerrado la sesion.`,
              icon: 'success'
            })
            this.formSecure.reset
            this._service.logout()
            this.loading = false
          },
          (err) => {
            this.loading = false;
          }
        );
        
      }
    });

  }
}
