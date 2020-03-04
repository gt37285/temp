import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { URL_SERVICES } from "src/app/config/config";
import { UsuariosService } from "../../../services/usuarios.service";
import { map } from "rxjs/operators";
import { UsuarioModel } from "../../../models/usuarios/usuario.model";
import { cursoModel } from "../../../models/cursos/cursos.model";
import { ModulesModel } from "../../../models/clases/modulos.model";
import { tareasModel } from "../../../models/clases/tareas.model";
import InstitucionModel from 'src/app/models/cursos/institucion.model';

@Component({
  selector: "app-busqueda",
  templateUrl: "./busqueda.component.html",
  styleUrls: ["./busqueda.component.scss"]
})
export class BusquedaComponent implements OnInit {
  public usuarios: UsuarioModel[];
  public cursos: cursoModel[];
  public modulos: ModulesModel[];
  public loading: boolean;
  public instituciones: InstitucionModel[]=[]

  constructor(
    private _routerActivated: ActivatedRoute,
    private _serviceUsuario: UsuariosService,
    public _http: HttpClient,
    private _router: Router
  ) {
    this.loading = true;
    this.usuarios = [];
    this.cursos = [];
    this.loading = false;
  }

  ngOnInit() {
    this._routerActivated.params.subscribe(data => {
      let termino = data.termino;
      this.loading = true;

      this.buscar(termino).subscribe((data: any) => {

        this.usuarios = data.usuarios.usuarios;
        this.cursos = data.cursos.cursos;
        this.instituciones = data.instituciones.instituciones
        this.loading = false;
      });
    });
  }

  buscar(termino: string) {
    let url = `${URL_SERVICES}/search/${termino}`;
    return this._http
      .get(url, { headers: this._serviceUsuario.cargarHeaders() })
      .pipe(map(data => data));
  }

  iracursos(id: string) {
    this._router.navigate(["/aula/curso/", id]);
  }

}
