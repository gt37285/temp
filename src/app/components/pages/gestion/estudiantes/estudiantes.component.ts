import { Component, OnInit } from '@angular/core';
import { cursoModel } from '../../../../models/cursos/cursos.model';
import { CursosService } from '../../../../services/cursos.service';
import { MatriculaService } from '../../../../services/matricula.service';
import { UsuarioModel } from '../../../../models/usuarios/usuario.model';
import { matriculaModel } from '../../../../models/cursos/matricula.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-estudiantes',
  templateUrl: './estudiantes.component.html',
  styleUrls: ['./estudiantes.component.scss', '../gestion.component.scss']
})
export class EstudiantesComponent implements OnInit {

  public total: number = 0
  public cursos: cursoModel[] = []
  public loading: boolean = false
  public estudiantes: UsuarioModel[] = []
  public id_curso: string = ''

  public selectedCursoObj:string =''

  constructor(
    private cursoService: CursosService,
    private service: MatriculaService
  ) { }

  ngOnInit() {
    this.listarCursos()
  }

  listarCursos() {
    this.loading = true
    this.cursoService.cargarCursoProfesorall()
      .subscribe(
        ((data: any) => {
          this.loading = false
          this.cursos = data.data
        }),
        (err => this.loading = false)
      )
  }

  listarEstudiantes(id_curso: string) {
    this.loading = true
    this.id_curso = id_curso
    this.service.listarEstudiantes(id_curso)
      .subscribe(
        ((data: any) => {
          this.loading = false
          this.total = data.length
          this.estudiantes = data
        }),
        (err => this.loading = false)
      )
  }


  rechazar(matricula: matriculaModel) {
    if (!this.id_curso) return

    Swal.fire({
      title: "Estas Seguro?",
      text: `Confirma que deseas eliminar el estudiante`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Continuar"
    }).then(data => {
      if (data.value) {
        this.loading = true
        this.service.eliminarEstudiantes(this.id_curso, matricula._id)
          .subscribe(
            ((data: any) => {
              Swal.fire({
                title: 'Proceso completado',
                text: data.message,
                icon: 'success'
              })
              this.loading = false
              this.total = data.length
              this.estudiantes = data
              this.listarEstudiantes(this.id_curso)
            }),
            (err => this.loading = false)
          )
      }
    });
  }


}
