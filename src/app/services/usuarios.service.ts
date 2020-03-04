import { Injectable, EventEmitter, OnInit } from "@angular/core";
import { SigninModel } from "../models/usuarios/signin.model";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { URL_SERVICES } from "../config/config";
import { map, catchError } from "rxjs/operators";
import { Router } from "@angular/router";
import { UsuarioModel } from "../models/usuarios/usuario.model";
import { ArchivoService } from "./archivo.service";
import Swal from "sweetalert2";
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: "root"
})
export class UsuariosService {
  public token: string;
  private autenticated: boolean;
  public user: UsuarioModel;
  public menu: any[] = [];
  public accesos: any[] = []
  public codigo:string  =''

  constructor(
    private _http: HttpClient,
    private _router: Router,
    private _archivoService: ArchivoService
  ) {
    this.cargarStorage();
  }

  cargarHeaders(): HttpHeaders {
    return new HttpHeaders({
      token: this.token,
    });
  }

  Signin(usuario: SigninModel) {
    let url = `${URL_SERVICES}/auth/signin`;

    return this._http.post(url, usuario).pipe(
      map((data: any) => {
        this.guardarStorage(data._id, data.token, data.user, data.menu, data.accesos);
        this.autenticated = data.auth;
        this.menu = data.menu;
        this.accesos = data.accesos

        if(!data.user.estado){
          Swal.fire({
            title: "Accedo denegado",
            text: 'Tu usuario actualmente esta inactivo, por favor contacta un administrador.',
            icon: "info",
            confirmButtonText: "Cool"
          })
          this.logout()
        }
        return data.user.rol;
        
      }),

      catchError(err => {
        Swal.fire({
          title: "No puedes acceder!",
          text: err.error.message,
          icon: "error",
          confirmButtonText: "Cool"
        });
        return Observable.throw(err)
      })
    );
  }

  isAutenticated() {
    return  this.isAutenticated && this.token.length > 5 ? true : false;
  }

  logout() {
    this.autenticated = false;
    this.token = "";
    localStorage.clear()
    sessionStorage.clear()
    this._router.navigate(["/"]);
    return this._http.get(`${URL_SERVICES}/auth/logout`)
    .subscribe(data => data)
  }

  cargarStorage() {
    if (localStorage.getItem("token")) {
      this.token = localStorage.getItem("token");
      this.user = JSON.parse(localStorage.getItem("usuario"));
      this.menu = JSON.parse(localStorage.getItem("menu"));
      if(localStorage.getItem("accesos")){
        this.accesos = JSON.parse(localStorage.getItem("accesos"))
      }
    } else {
      this.token = "";
      this.menu = [];
    }
  }

  guardarStorage(
    id: string,
    token: string,
    usuario: UsuarioModel,
    menu: any[],
    accesos:any[]
  ) {
    localStorage.setItem("id", id);
    localStorage.setItem("token", token);
    localStorage.setItem("usuario", JSON.stringify(usuario));
    localStorage.setItem("menu", JSON.stringify(menu));
    localStorage.setItem("accesos", JSON.stringify(accesos));
    this.token = token;
    this.user = usuario;
    this.menu = menu;
  }

  actualizarUsuario(usuario: UsuarioModel) {
    return this._http
      .put(`${URL_SERVICES}/auth/user/${usuario._id}`, usuario, {
        headers: this.cargarHeaders()
      })
      .pipe(
        map((data: any) => {
          return data;
        }),
        catchError((err: any) => {
          let mensaje = err.error.err.message

          if (err.error.err.codeName === "DuplicateKey") {
            mensaje = 'El email no se encuentra disponible'
          }

          Swal.fire({
            title: "Hubo un conflicto!",
            text: mensaje,
            icon: "error",
            confirmButtonText: "Cool"
          });

          return Observable.throw(err)
        })
      );
  }

  actualizarUsuarioAcual(usuario: UsuarioModel) {
    return this._http
      .put(`${URL_SERVICES}/auth/user/${usuario._id}`, usuario, {
        headers: this.cargarHeaders()
      })
      .pipe(
        map((data: any) => {
          this.guardarStorage(data.user._id, this.token, data.user, this.menu, this.accesos);
          return data;
        })
      );
  }

  cargarImg(archivo: File, id: string) {
    this._archivoService
      .subirArchivo(archivo, "usuarios", id)
      .then((data: any) => {
        this.user.img = data.img;
        this.guardarStorage(data.id, this.token, this.user, this.menu, this.accesos);
        Swal.fire({
          title: "Proceso completado!",
          text: data.message,
          icon: "success",
          confirmButtonText: "Cool"
        });
      })
      .catch(err =>{{
        Swal.fire({
          title: err.message,
          text: err.ext_permitidas,
          icon: "error",
          confirmButtonText: "Cool"
        })
      }}
      );
  }

  cargarUsuarios(desde: number = 0) {
    let url = `${URL_SERVICES}/auth/user?desde=${desde}`;

    return this._http.get(url, { headers: this.cargarHeaders() }).pipe(
      map((data: any) => {
        return data;
      }),
      catchError(err => {

        Swal.fire({
          title: "Error!",
          text: err.error.message,
          icon: "error",
          confirmButtonText: "Cool"
        })
        return Observable.throw(err)
      })

    );
  }

  buscarUsuarios(termino: string) {
    let url = `${URL_SERVICES}/search/usuarios/${termino}`;

    return this._http.get(url, { headers: this.cargarHeaders() }).pipe(
      map((data: any) => {
        for (const usuario of data.data.usuarios) {
          if (usuario.institucion == "") {
            usuario.institucion = "no definido";
          }
        }
        return data.data.usuarios;
      }),
      catchError(err => {

        Swal.fire({
          title: "Error!",
          text: err.error.message,
          icon: "error",
          confirmButtonText: "Cool"
        })
        return Observable.throw(err)
      })
    );
  }

  borrarUsuario(usuario: UsuarioModel) {
    let url = `${URL_SERVICES}/auth/user/${usuario._id}`;
    return this._http
      .delete(url, { headers: this.cargarHeaders() })
      .pipe(
        map((data: any) => data.message),
        catchError(err => {

          Swal.fire({
            title: "Error!",
            text: err.error.message,
            icon: "error",
            confirmButtonText: "Cool"
          })
          return Observable.throw(err)
        })
      );
  }

  actualizarEstadoUsuario(usuario: UsuarioModel) {
    let url = `${URL_SERVICES}/auth/user_activate/${usuario._id}`;
    return this._http
      .put(url, usuario, { headers: this.cargarHeaders() })
      .pipe(
        map((data: any) => data),
        catchError(err => {

          Swal.fire({
            title: "Error!",
            text: err.error.message,
            icon: "error",
            confirmButtonText: "Cool"
          })
          return Observable.throw(err)
        })
      );
  }

  actualizarPassword(usuario: UsuarioModel) {
    let url = `${URL_SERVICES}/auth/user/password/${usuario._id}`;
    return this._http
      .put(url, usuario, { headers: this.cargarHeaders() })
      .pipe(
        map((data: any) => data),
        catchError(err => {

          Swal.fire({
            title: "Error!",
            text: err.error.message,
            icon: "error",
            confirmButtonText: "Cool"
          })
          return Observable.throw(err)
        })
      );
  }

  actualizarEmail(usuario: UsuarioModel) {
    let url = `${URL_SERVICES}/auth/user/email/${this.user._id}`;
    return this._http
      .put(url, usuario, { headers: this.cargarHeaders() })
      .pipe(
        map((data: any) => data),
        catchError(err => {

          Swal.fire({
            title: "Error!",
            text: err.error.message,
            icon: "error",
            confirmButtonText: "Cool"
          })
          return Observable.throw(err)
        })
      );
  }

  crearUsuario(usuario: UsuarioModel) {
    let url = `${URL_SERVICES}/auth/signup`;
    return this._http
      .post(url, usuario, { headers: this.cargarHeaders() })
      .pipe(
        map((data: any) => data.message),
        catchError(err => {

          let email = err.error.message.message

          email = email.substring(email.lastIndexOf(':') + 1, email.length)

          Swal.fire({
            title: "Error!",
            text: email,
            icon: "error",
            confirmButtonText: "Cool"
          })
          return Observable.throw(err)
        })
      );
  }


  enviarEmailReset(email:string) {
    let url = `${URL_SERVICES}/aula/password/email`;
    return this._http
      .post(url, {email}, { headers: this.cargarHeaders() })
      .pipe(
        map((data: any) => {
          this.codigo = data.codigo
          return true
        }),
        catchError(err => {

          console.log(err);

          Swal.fire({
            title: "Error!",
            text: err.error.message,
            icon: "error",
            confirmButtonText: "Cool"
          })
          return Observable.throw(err)
        })
      );
  }

  enviarCodeReset(code: string) {
    let url = `${URL_SERVICES}/aula/password/email`;

    let body = {
      codigoIngresado:code,
      codigoOriginal :this.codigo
    }

    return this._http
      .put(url, body, { headers: this.cargarHeaders() })
      .pipe(
        map((data: any) => data),
        catchError(err => {

          console.log(err);

          Swal.fire({
            title: "Error!",
            text: err.error.message,
            icon: "error",
            confirmButtonText: "Cool"
          })
          return Observable.throw(err)
        })
      );
  }


  changePass(user:UsuarioModel) {
    let url = `${URL_SERVICES}/aula/password/reset`;
    return this._http
      .put(url, user, { headers: this.cargarHeaders() })
      .pipe(
        map((data: any) => data),
        catchError(err => {

          console.log(err);
          Swal.fire({
            title: "Error!",
            text: err.error.message,
            icon: "error",
            confirmButtonText: "Cool"
          })
          return Observable.throw(err)
        })
      );
  }
}
