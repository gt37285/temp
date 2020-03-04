import { NgModule } from "@angular/core";

/**componentes */

import { ProgressComponent } from "./progress/progress.component";
import { PagesComponent } from "./pages.component";
import { ProfileComponent } from "./profile/profile.component";
import { BusquedaComponent } from './busqueda/busqueda.component';

/**modulos */

import { SharedModule } from "../shared/shared.module";
import { ErrorsModule } from "../errors/errors.module";
import { PagesRouterModule } from "./pages.routes";
import { PipesModule } from "../../pipes/pipes.module";
import { PrincipalModule } from "./principal/principal.module";

import { MatSelectModule } from "@angular/material/select";
import { MatDatepickerModule } from "@angular/material/datepicker";

import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";

import { ModalUploadComponent } from "./modal-upload/modal-upload.component";

import { ColeccionesModule } from "./colecciones/colecciones.module";
import { MatNativeDateModule } from "@angular/material/core";
import { CommonModule } from '@angular/common';
import { GestionModule } from './gestion/gestion.module';



@NgModule({
  declarations: [
    ProgressComponent,
    ProfileComponent,
    BusquedaComponent
  ],
  imports: [
    SharedModule,
    ErrorsModule,
    GestionModule,
    PagesRouterModule,
    PipesModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    ColeccionesModule,
    PrincipalModule,
    CommonModule
  ],

  exports: [
    ProgressComponent,
    SharedModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    ColeccionesModule,
    PrincipalModule,
    GestionModule
  ]
})
export class PagesModule { }
