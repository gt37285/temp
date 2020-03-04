import { NgModule, LOCALE_ID } from "@angular/core";
import { UsuariosComponent } from "./usuarios/usuarios.component";
import { SharedModule } from "../../shared/shared.module";
import { ErrorsModule } from "../../errors/errors.module";
import { PipesModule } from "../../../pipes/pipes.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatDatepickerModule } from "@angular/material/datepicker";

import { registerLocaleData, CommonModule } from '@angular/common';
import español from "@angular/common/locales/es-EC";
registerLocaleData(español);

/**angular material */
import { MatFormFieldModule } from "@angular/material/form-field";
import { InstitucionComponent } from './instituciones/institucion.component';
import { PasswordComponent } from './password/password.component';

@NgModule({
  declarations: [UsuariosComponent, InstitucionComponent, PasswordComponent],
  imports: [
    SharedModule,
    ErrorsModule,
    CommonModule,
    PipesModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatDatepickerModule,
    MatFormFieldModule
  ],
  exports: [
    UsuariosComponent,
    InstitucionComponent,
    SharedModule,
    ErrorsModule,
    CommonModule,
    PipesModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatDatepickerModule,
    MatFormFieldModule
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: "es-EC"
    }
  ]
})
export class ColeccionesModule { }
