import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuariosService } from '../services/usuarios.service';

@Injectable({
  providedIn: 'root'
})
export class ProfGuard implements CanActivate {

  constructor(
    private _service: UsuariosService
  ) { }

  canActivate() {

    if (this._service.user.rol == "PROF_ROLE") {
      return true;
    }

    this._service.logout();
    return false;
  }

}
