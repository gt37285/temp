import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

/**componenentes */

import { AboutComponent } from "./about/about.component";
import { BlogComponent } from "./blog/blog.component";
import { ContactsComponent } from "./contacts/contacts.component";
import { SigninComponent } from "./signin/signin.component";
import { StartComponent } from "./start/start.component";
import { HomeComponent } from "./home.component";
import { NavComponent } from "./nav/nav.component";
import { FooterComponent } from "./footer/footer.component";

/**modulos */

import { SharedModule } from "../shared/shared.module";
import { ErrorsModule } from "../errors/errors.module";
import { HomeRouterModule } from "./home.routes";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

/**modulos de material */

import { MatButtonModule } from "@angular/material/button";
import { PipesModule } from "../../pipes/pipes.module";
import { ResetComponent } from './reset/reset.component';


import { MatStepperModule } from "@angular/material/stepper";
import { MatInputModule } from '@angular/material/input';


@NgModule({
  declarations: [
    AboutComponent,
    BlogComponent,
    ContactsComponent,
    SigninComponent,
    StartComponent,
    HomeComponent,
    NavComponent,
    FooterComponent,
    ResetComponent
  ],
  imports: [
    SharedModule,
    ErrorsModule,
    HomeRouterModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    PipesModule,
    MatStepperModule,
    MatInputModule
  ],
  exports: [
    AboutComponent,
    ResetComponent,
    BlogComponent,
    ContactsComponent,
    SigninComponent,
    StartComponent,
    HomeComponent,
    MatButtonModule,
    ReactiveFormsModule,
    BrowserModule,
    MatStepperModule,
    MatInputModule
  ]
})
export class HomeModule {}
