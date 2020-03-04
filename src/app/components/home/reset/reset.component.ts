import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { UsuariosService } from '../../../services/usuarios.service';
import { SigninModel } from "../../../models/usuarios/signin.model";
import Swal from "sweetalert2";
import { Router } from "@angular/router";
import { UsuarioModel } from '../../../models/usuarios/usuario.model';
import { cursoModel } from '../../../models/cursos/cursos.model';
import { passwordPipe } from '../../../pipes/password.pipe';

@Component({
  selector: "app-reset",
  templateUrl: "./reset.component.html",
  styleUrls: ["./reset.component.scss", "../signin/signin.component.scss"]
})
export class ResetComponent implements OnInit {

  public loading: boolean = false
  public email: string = ''
  public codigo:boolean = false


  public firstFormGroup: FormGroup
  public secondFormGroup: FormGroup
  public passwordFormGroup: FormGroup

  constructor(private _service: UsuariosService, private _router: Router) {
    this.firstFormGroup = new FormGroup({
      email: new FormControl('', [Validators.email, Validators.required])
    })
    this.secondFormGroup = new FormGroup({
      code: new FormControl('', [Validators.required])
    })
    this.passwordFormGroup = new FormGroup({
      password: new FormControl('',[Validators.required])
    })
  }

  ngOnInit(): void {
   
  }

  enviarEmail() {
    
    
    if (this.firstFormGroup.invalid ) {
      return Swal.fire({
        title: 'Debes ingresar un email',
        text: 'recuerda que el email debe ser valido',
        icon: 'warning'
      })
    }
    
    const email = this.firstFormGroup.value.email
    this.email = email

    this.loading = true

    this._service.enviarEmailReset(email)
      .subscribe(
        ((data: any) => {

          Swal.fire({
            title: 'Codigo enviado!',
            text: `ingresa el codigo en el campo solicitado`,
            icon: 'success'
          })

          
          this.loading = false
        }),
        (err) => {
          this.loading = false
        }
      )
  }

  codeAutorice(estado: boolean): any {
    console.log(estado);
    if (estado == false) {
      return {
        code_err: true
      }
    }
    return null
  }

  enviarCode() {

    if (this.secondFormGroup.invalid ) {
      return Swal.fire({
        title: 'Debes ingresar el codigo',
        text: 'si el correo no llega a tu bandeja de entrada, revisa el span',
        icon: 'warning'
      })
    }

    const code = this.secondFormGroup.value.code

    this.loading = true

    this._service.enviarCodeReset(code)
      .subscribe(
        ((data: any) => {

          Swal.fire({
            title: 'Acceso concedido',
            text: `Ahora puedes cambiar tu contraseña`,
            icon: 'success'
          })
          this.codigo = true
          this.loading = false
        }),
        (err) => {
          this.codigo = false
          this.loading = false
        }
      )

  }

  changePass() {

    if (!this.codigo) {
      return Swal.fire({
        title: 'revisa nuevamente el codigo',
        text: 'codigo no valido',
        icon: 'warning'
      })
    }

    if (this.passwordFormGroup.invalid) {
      return Swal.fire({
        title: 'Debes ingresar la nueva contraseña',
        text: 'procura no olvidarla :D',
        icon: 'warning'
      })
    }

    let user: UsuarioModel = this.passwordFormGroup.value
    user.email = this.email


    this._service.changePass(user)
      .subscribe(
        ((data: any) => {

          Swal.fire({
            title: 'Proceso completado',
            text: `tu contraseña se ha cambiado`,
            icon: 'success'
          })

          console.log(data);
          this.loading = false
        }),
        (err) => this.loading = false
      )
  }

  signin() {
    this._router.navigate(['signin'])
  }


}
