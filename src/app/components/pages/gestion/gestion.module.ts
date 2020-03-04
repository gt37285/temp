import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CursosProfComponent } from './cursos-prof/cursos-prof.component';
import { SharedModule } from '../../shared/shared.module';
import { PipesModule } from '../../../pipes/pipes.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ColeccionesModule } from '../colecciones/colecciones.module';
import { TareasComponent } from './tareas/tareas.component';
import { ModulosProfComponent } from './modulos/modulos.component';
import { ClaseComponent } from './clases/clases.component';
import { RecursosComponent } from './recursos/recursos.component';
import { MatriculasComponent } from './matriculas/matriculas.component';
import { EstudiantesComponent } from './estudiantes/estudiantes.component';
import { RechazadosComponent } from './matriculas/rechazados/rechazados.component';
import { EvaluacionesComponent } from './evaluaciones/evaluaciones.component';
import { FormularioComponent } from './evaluaciones/formulario/formulario.component';

import { CKEditorModule } from 'ckeditor4-angular';
import {MatRadioModule, MAT_RADIO_DEFAULT_OPTIONS} from '@angular/material/radio';
import { HttpClientModule} from '@angular/common/http';
import {MatCheckboxModule} from '@angular/material/checkbox';


@NgModule({
  declarations: [
    CursosProfComponent,
    ModulosProfComponent,
    TareasComponent,
    ClaseComponent,
    RecursosComponent,
    MatriculasComponent,
    EstudiantesComponent,
    RechazadosComponent,
    EvaluacionesComponent,
    FormularioComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    PipesModule,
    MatFormFieldModule,
    ColeccionesModule,
    HttpClientModule,
    CKEditorModule,
    MatRadioModule,
    MatCheckboxModule
  ],
  exports: [SharedModule, PipesModule,HttpClientModule,CKEditorModule,MatRadioModule,MatCheckboxModule],
  providers: [{
    provide: MAT_RADIO_DEFAULT_OPTIONS,
    useValue: { color: 'primary' },
}]
})
export class GestionModule { }
