import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { UsuariosService } from "../services/usuarios.service";

@Injectable({
  providedIn: "root"
})
export class SigninGuard implements CanActivate {
  constructor(private _service: UsuariosService, private _router: Router) { }

  canActivate() {
    if (this._service.isAutenticated()) {
      return true;
    } else {
      this._router.navigate(["/home"]);
      return false;
    }
  }
}
