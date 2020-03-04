import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

/**componenentes */

import { AppComponent } from "./app.component";

/**modulos */

import { RoutersModule } from "./app.routes";
import { HomeModule } from "./components/home/home.module";
import { PagesModule } from "./components/pages/pages.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

/**servicios de http */
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { CommonModule } from '@angular/common';
import { PagesComponent } from './components/pages/pages.component';
import { ModalUploadComponent } from './components/pages/modal-upload/modal-upload.component';
import { SharedModule } from './components/shared/shared.module';
import { AuthInterceptor } from './services/auth.interceptor';
@NgModule({
  declarations: [AppComponent, PagesComponent],
  imports: [
    BrowserModule,
    RoutersModule,
    HomeModule,
    // PagesModule,
    SharedModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
