import { Routes, RouterModule } from "@angular/router";

/**componentes */

import { DashboardComponent } from "./principal/dashboard/dashboard.component";

/**guards */

import { SigninGuard } from "../../guards/signin.guard";
import { GraficasComponent } from "./principal/graficas/graficas.component";
import { ProfileComponent } from "./profile/profile.component";
import { UsuariosComponent } from "./colecciones/usuarios/usuarios.component";
import { SchedulerComponent } from "./principal/scheduler/scheduler.component";
import { CursosComponent } from "./principal/cursos/cursos.component";
import { CursodComponent } from "./principal/curso/curso.component";
import { BusquedaComponent } from "./busqueda/busqueda.component";
import { AdminGuard } from "../../guards/admin.guard";
import { ModulosComponent } from './principal/modulos/modulos.component';
import { CursosProfComponent } from './gestion/cursos-prof/cursos-prof.component';
import { TareasComponent } from './gestion/tareas/tareas.component';
import { ProfGuard } from '../../guards/prof.guard';
import { EstGuard } from '../../guards/est.guard';
import { InstitucionComponent } from './colecciones/instituciones/institucion.component';
import { ModulosProfComponent } from './gestion/modulos/modulos.component';
import { ClaseComponent } from './gestion/clases/clases.component';
import { RecursosComponent } from './gestion/recursos/recursos.component';
import { CursosGuard } from '../../guards/cursos.guard';
import { MatriculasComponent } from './gestion/matriculas/matriculas.component';
import { EstudiantesComponent } from './gestion/estudiantes/estudiantes.component';
import { RechazadosComponent } from './gestion/matriculas/rechazados/rechazados.component';
import { EvaluacionesComponent } from './gestion/evaluaciones/evaluaciones.component';
import { FormularioComponent } from './gestion/evaluaciones/formulario/formulario.component';
import { TestComponent } from './principal/test/test.component';
import { ResultadoComponent } from './principal/test/resultado/resultado.component';
import { EvaluacionesGuard } from 'src/app/guards/evaluaciones.guard';
import { ReportesComponent } from './gestion/evaluaciones/reportes/reportes.component';
import { PreguntasGuard } from 'src/app/guards/preguntas.guard';
import { ObjetivosRequerimentosComponent } from './gestion/cursos-prof/objetivos-requerimentos/objetivos-requerimentos.component';
import { PasswordComponent } from './colecciones/password/password.component';
import { SuperadminGuard } from 'src/app/guards/superadmin.guard';
import { CalificacionesComponent } from './principal/modulos/calificaciones/calificaciones.component';

const routes: Routes = [

  {
    path: "buscador/:termino",
    component: BusquedaComponent,
    data: { titulo: "Buscador", father: "Aula virtual" }
  },
  {
    path: "dashboard",
    component: DashboardComponent,
    data: { titulo: "Dashboard", father: "Principal" }
  },
  // {
  //   path: "graficas",
  //   component: GraficasComponent,
  //   data: { titulo: "Graficas", father: "Principal" }
  // },
  {
    path: "perfil",
    component: ProfileComponent,
    data: { titulo: "Perfil de usuario", father: "Usuario" }
  },

  /**principal */

  {
    path: "scheduler",
    component: SchedulerComponent,
    canActivate: [EstGuard],
    data: { titulo: "Calendario", father: "Principal" }
  },

  {
    path: "cursos",
    component: CursosComponent,
    data: { titulo: "Cursos", father: "Principal" }
  },
  {
    path: "curso/:id",
    component: CursodComponent,
    canActivate: [EstGuard],
    data: { titulo: "Curso", father: "Principal" }
  },
  {
    path: "curso/modulo/:id",
    component: ModulosComponent,
    canActivate: [EstGuard,CursosGuard],
    data: { titulo: "Curso", father: "Principal" }
  },
  {
    path: "evaluaciones/:id",
    component: TestComponent,
    canActivate: [EstGuard,CursosGuard,EvaluacionesGuard],
    data: { titulo: "Evaluacion", father: "Cursos" }
  },
  {
    path: "evaluaciones/registro/resultados/:id",
    component: ResultadoComponent,
    canActivate: [EstGuard,CursosGuard],
    data: { titulo: "Evaluacion", father: "Cursos" }
  },
  {
    path: "calificaciones/:id",
    component: CalificacionesComponent,
    canActivate: [EstGuard,CursosGuard],
    data: { titulo: "Evaluacion", father: "Cursos" }
  },

  /**colecciones */
  {
    path: "usuarios",
    component: UsuariosComponent,
    canActivate: [AdminGuard],
    data: { titulo: "Gestion de usuarios", father: "Colecciones" }
  },
  {
    path: "usuarios/passwords",
    component: PasswordComponent,
    canActivate: [AdminGuard,SuperadminGuard],
    data: { titulo: "Gestion de Contraseñas", father: "Colecciones" }
  },
  {
    path: "institucion",
    component: InstitucionComponent,
    canActivate: [AdminGuard],
    data: { titulo: "Gestion de Instituciones", father: "Colecciones"}
  },

  /**gestion profesores */

  {
    path: "prof/cursos",
    component: CursosProfComponent,
    canActivate: [ProfGuard],
    data: { titulo: "Gestion de cursos", father: "Gestion" }
  },
  {
    path: "prof/modulos",
    component: ModulosProfComponent,
    canActivate: [ProfGuard],
    data: { titulo: "Gestion de Modulos", father: "Gestion"}
  },
  {
    path: "prof/clases",
    component: ClaseComponent,
    canActivate: [ProfGuard],
    data: { titulo: "Gestion de Clases", father: "Gestion"}
  },
  {
    path: "prof/cursos/objetivosRequisitos/:id",
    component: ObjetivosRequerimentosComponent,
    canActivate: [ProfGuard],
    data: { titulo: "Gestion de Cursos", father: "Gestion"}
  },
  {
    path: "prof/recursos",
    component: RecursosComponent,
    canActivate: [ProfGuard],
    data: { titulo: "Gestion de Recursos", father: "Gestion"}
  },
  {
    path: "prof/tareas",
    component: TareasComponent,
    canActivate: [ProfGuard],
    data: { titulo: "Gestion de tareas", father: "Gestion" }
  },
  {
    path: "prof/evaluaciones",
    component: EvaluacionesComponent,
    canActivate: [ProfGuard],
    data: { titulo: "Evaluaciones", father: "Gestion" }
  },
  {
    path: "prof/evaluaciones/reportes/:id",
    component: ReportesComponent,
    canActivate: [ProfGuard],
    data: { titulo: "Reporte de Estudiantes", father: "Evaluaciones" }
  },
  {
    path: "prof/evaluaciones/formulario/:id",
    component: FormularioComponent,
    //agregar guard de preguntas
    canActivate: [ProfGuard],
    data: { titulo: "Evaluaciones", father: "Gestion" }
  },
  {
    path: "prof/matriculas",
    component: MatriculasComponent,
    canActivate: [ProfGuard],
    data: { titulo: "Lista de aprovacion", father: "Matriculas" }
  },
  {
    path: "prof/matricula/rechazadas",
    component: RechazadosComponent,
    canActivate: [ProfGuard],
    data: { titulo: "Lista de rechazados", father: "Matriculas" }
  },
  {
    path: "prof/estudiantes",
    component: EstudiantesComponent,
    canActivate: [ProfGuard],
    data: { titulo: "Listado de Estudiantes", father: "Matriculas" }
  }
  
  
];

export const PagesRouterModule = RouterModule.forChild(routes);
