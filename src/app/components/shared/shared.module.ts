import { NgModule } from "@angular/core";

import { SidebarComponent } from "./sidebar/sidebar.component";
import { BreadcrumbsComponent } from "./breadcrumbs/breadcrumbs.component";
import { NavbarComponent } from "./navbar/navbar.component";

/**modulos material */
import { MatButtonModule } from "@angular/material/button";
import { PipesModule } from "../../pipes/pipes.module";
import { RouterModule } from "@angular/router";
import { LoadingComponent } from "./loading/loading.component";

import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { CommonModule } from '@angular/common';
import { ModalUploadComponent } from '../pages/modal-upload/modal-upload.component';

@NgModule({
  declarations: [
    SidebarComponent,
    BreadcrumbsComponent,
    NavbarComponent,
    LoadingComponent,
    ModalUploadComponent

  ],
  imports: [
    MatButtonModule,
    CommonModule,
    PipesModule,
    RouterModule,
    MatProgressSpinnerModule
  ],
  exports: [
    SidebarComponent,
    ModalUploadComponent,
    BreadcrumbsComponent,
    NavbarComponent,
    MatButtonModule,
    MatProgressSpinnerModule,
    LoadingComponent
  ]
})
export class SharedModule { }
