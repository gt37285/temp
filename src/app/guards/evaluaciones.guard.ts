import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { evaluacionesService } from '../services/evaluaciones.service';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class EvaluacionesGuard implements CanActivate {

  constructor(
    private service:evaluacionesService,
    private router:Router
    ){}

  canActivate(): boolean {

    let permiso = false
    let estado = sessionStorage.getItem('izx')
    let evaluacion = sessionStorage.getItem('evd')


    if(estado == "0"){
      permiso = true
    }else{
      this.router.navigate(['/aula/evaluaciones/registro/resultados',evaluacion])
    }

    return permiso;
  }
  
}
