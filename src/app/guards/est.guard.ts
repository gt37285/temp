import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuariosService } from '../services/usuarios.service';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class EstGuard implements CanActivate {
  constructor(
    private _service: UsuariosService
  ) { }

  canActivate() {

    if (this._service.user.rol == "EST_ROLE") {
      return true;
    }else{
      Swal.fire({
        title: 'Acceso negado ',
        text: 'El acceso a este modulo solo esta disponible para perfiles de estudiantes.',
        icon: 'info'
      })
    }


    return false;
  }

  

}
