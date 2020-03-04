import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { CursosService } from '../services/cursos.service';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class CursosGuard implements CanActivate {
  private estado: boolean = false

  constructor(private servicio:CursosService){
    
  }
  canActivate(): boolean {
    return this.servicio.matricula;
  }
  
}
