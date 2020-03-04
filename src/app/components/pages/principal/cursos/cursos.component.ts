import { Component, OnInit } from "@angular/core";
import { cursoModel } from "../../../../models/cursos/cursos.model";
import { CursosService } from "../../../../services/cursos.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-cursos",
  templateUrl: "./cursos.component.html",
  styleUrls: ["./cursos.component.scss"]
})
export class CursosComponent implements OnInit {
  public cursos: cursoModel[];
  public loading: boolean;

  constructor(
    private _service: CursosService,
    private _router: Router
  ) { }

  ngOnInit() {
    this.cargarCursos()
  }

  cargarCursos() {
    this.loading = true
    this._service.cargarCursos().subscribe((data: any) => {
      this.cursos = data;
      this.loading = false;
    },(err) => this.loading = false);
  }

  buscar(valor) {
    if (!valor) {
      return this.cargarCursos()
    } else {
      this._service.buscarCursos(valor)
        .subscribe(data => {
          this.cursos = data
        })
    }
  }

  target(curso: cursoModel) {
    this._router.navigate(["/aula/curso", curso._id]);
  }
}
