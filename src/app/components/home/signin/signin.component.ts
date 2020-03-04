import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { UsuariosService } from "../../../services/usuarios.service";
import { SigninModel } from "../../../models/usuarios/signin.model";
import Swal from "sweetalert2";
import { Router } from "@angular/router";

@Component({
  selector: "app-signin",
  templateUrl: "./signin.component.html",
  styleUrls: ["./signin.component.scss"]
})
export class SigninComponent implements OnInit {
  public icon_eye: boolean;
  public forma: FormGroup;
  public text_show: string;
  public user: any;
  public resp: any;
  public loading:boolean = false

  constructor(private _service: UsuariosService, private _router: Router) {
    this.icon_eye = true;
    this.text_show = "text";
    this.resp = {
      success: false,
      message: ""
    };
  }

  ngOnInit(): void {
    this.forma = new FormGroup({
      email: new FormControl(""),
      password: new FormControl("")
    });

    this.forma
      .get("email")
      .setValidators([
        Validators.required,
        Validators.email,
        Validators.pattern(
          "^[_a-z0-9-]+(.[_a-z0-9-]+)*@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{2,4})$"
        )
      ]);
    this.forma
      .get("password")
      .setValidators([Validators.required, Validators.minLength(8)]);
  }

  iconEye() {
    this.icon_eye = false;
  }

  iconEyeSlash() {
    this.icon_eye = true;
  }

  enviar() {
    let email = this.forma.value.email;
    let password = this.forma.value.password;
    this.loading = true

    if (this.forma.invalid) {
      this.loading = false
      return 
    }


    let usuario = new SigninModel(email, password);

    this._service
      .Signin(usuario)
      .subscribe(data => {
        this.loading = false
        switch (data) {
          case 'ADMIN_ROLE':
            this._router.navigate(["aula/usuarios"])
            break;
          case 'PROF_ROLE':
            this._router.navigate(["aula/prof/cursos"])
            break;
          case 'EST_ROLE':
            this._router.navigate(["aula/scheduler"])
            break;
        }
      },
        (err) => {
          this.loading = false
        }
      );
  }
}
