import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class PreguntasGuard implements CanActivate {

  constructor(private router:Router){}

  canActivate(): boolean  {

    let permiso = false
    let estado = sessionStorage.getItem('izv')


    if(estado && estado == '0'){
      permiso = true
    }else{
      Swal.fire({
        title: 'Accesso restringido',
        text: 'No se permite subir ni editar preguntas si la fecha de evaluación ya caducó',
        icon: 'info'
      })
      this.router.navigate(['/aula/prof/evaluaciones'])
    }

    sessionStorage.removeItem('izv')

    return true;
  }
  
}
