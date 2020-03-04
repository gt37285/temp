import { NgModule } from "@angular/core";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { GraficasComponent } from "./graficas/graficas.component";
import { SchedulerComponent } from "./scheduler/scheduler.component";

/**fullcalendar */

import { FullCalendarModule } from "@fullcalendar/angular";
import { SharedModule } from "../../shared/shared.module";
import { ErrorsModule } from "../../errors/errors.module";
import { PagesRouterModule } from "../pages.routes";
import { PipesModule } from "../../../pipes/pipes.module";
import { MatInputModule } from "@angular/material/input";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CursosComponent } from "./cursos/cursos.component";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { CursodComponent } from "./curso/curso.component";
import { CommonModule } from '@angular/common';
import { ModulosComponent } from './modulos/modulos.component';

import { MatExpansionModule } from '@angular/material/expansion';
import { TestComponent } from './test/test.component';
import {MatRadioModule} from '@angular/material/radio';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { ResultadoComponent } from './test/resultado/resultado.component';

@NgModule({
  declarations: [
    DashboardComponent,
    GraficasComponent,
    SchedulerComponent,
    CursosComponent,
    CursodComponent,
    ModulosComponent,
    TestComponent,
    ResultadoComponent
  ],
  imports: [
    FullCalendarModule,
    SharedModule,
    ErrorsModule,
    PagesRouterModule,
    CommonModule,
    PipesModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatExpansionModule,
    MatRadioModule,
    MatCheckboxModule
  ],
  exports: [
    DashboardComponent,
    GraficasComponent,
    SchedulerComponent,
    CursosComponent,
    MatProgressSpinnerModule,
    MatExpansionModule,
    MatRadioModule,
    MatCheckboxModule
  ]
})
export class PrincipalModule { }
