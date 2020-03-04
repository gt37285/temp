import { Component, OnInit } from "@angular/core";
import { cursoModel } from "../../../../models/cursos/cursos.model";
import { CursosService } from "../../../../services/cursos.service";
import { ActivatedRoute, Router } from '@angular/router';
import { UsuariosService } from '../../../../services/usuarios.service';
import { TareasService } from '../../../../services/tareas.service';
import Swal from 'sweetalert2';
import { ObjetivosService } from '../../../../services/objetivos.service';
import { ObjetivoModel } from 'src/app/models/cursos/objetivos.model';
import { requerimentosService } from '../../../../services/requerimentos.service';
import { requerimentoModel } from 'src/app/models/cursos/requerimentos.model';

@Component({
  selector: "app-curso",
  templateUrl: "./curso.component.html",
  styleUrls: ["./curso.component.scss"]
})
export class CursodComponent implements OnInit {
  public curso: cursoModel;
  public loading: boolean = false;
  public objetivos: ObjetivoModel[] = [];
  public requerimentos: requerimentoModel[] = []
  public matriculado:boolean = false
 
  constructor(
    private _service: CursosService,
    private _routerLink: ActivatedRoute,
    private _router: Router,
    private _objetivosService: ObjetivosService,
    private _requerimentosService: requerimentosService
  ) { }

  ngOnInit() {
    this.cargarCurso()
  }

  cargarCurso() {
    this.loading = true
    this._routerLink.params.subscribe( url => {

      this._service.id_curso = url.id
      this.verificarMatricula()

      this._service.cargarCurso(url.id).subscribe(data => {
        this.curso = data;
        this.loading = false;
      });
      this.listarObjetivos(url.id)
      this.listarRequerimentos(url.id)

      
    });
  }

  verificarMatricula() {
      this._service.verificarMatricula()
      .subscribe(
        (data => {
          this._service.matricula = data.estado
          this.matriculado = data.estado
        })
      )
  }

  listarObjetivos(id_curso: string) {
    this.loading = true
    this._objetivosService.listarObjetivos(id_curso)
      .subscribe(
        (data => {
          this.objetivos = data
          this.loading = false
        }),
        (err => this.loading = false)
      )
  }

  listarRequerimentos(id_curso: string) {
    this.loading = true,
      this._requerimentosService.listar(id_curso)
      .subscribe(
        (data => {
          this.requerimentos = data
          this.loading = false
        }),
        (err => this.loading = false)
      )
  }

  registro() {
    this.loading = true
    this._service.registro(this.curso._id)
      .subscribe(
        ((data: any) => {

          if( !data.message ) return
          Swal.fire({
            title: 'completado!',
            text: data.message,
            icon: 'success'
          })

          this.loading = false

        }),
        (err => this.loading = false)
      )

    
  }

  irAcurso() {
    this._router.navigate(['/aula/curso/modulo', this.curso._id])
  }

}
