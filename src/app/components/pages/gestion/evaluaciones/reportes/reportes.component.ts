import { Component, OnInit } from '@angular/core';
import { evaluacionModel } from 'src/app/models/cursos/evaluacion.model';
import { ActivatedRoute } from '@angular/router';
import { evaluacionesService } from 'src/app/services/evaluaciones.service';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.scss','../../gestion.component.scss']
})
export class ReportesComponent {

  private id:String = ''
  public evaluaciones:evaluacionModel[] = []
  public total:Number = 0

  constructor(
    private activatedRouter:ActivatedRoute,
    private service:evaluacionesService
  ) { 
    this.activatedRouter.params.subscribe((data:any) => {
      this.id = data.id
      this.service.listarReportes(data.id)
        .subscribe((evaluacion:any) => {
          console.log(evaluacion);
          this.evaluaciones = evaluacion
          this.total = evaluacion.length
        })
    })
  }

}
