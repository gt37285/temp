import { RouterModule, Routes } from "@angular/router";

/**componentes */

import { NotFoundComponent } from "./components/errors/not-found/not-found.component";
import { PagesComponent } from './components/pages/pages.component';
import { SigninGuard } from './guards/signin.guard';


import { PagesModule } from './components/pages/pages.module';


const routes: Routes = [
  { path: "not_found", component: NotFoundComponent },
  {
    path: "aula",
    component: PagesComponent,
    canActivate: [SigninGuard],
    loadChildren: './components/pages/pages.module#PagesModule'
  },
  { path: "**", pathMatch: "full", redirectTo: "not_found" }
];

export const RoutersModule = RouterModule.forRoot(routes, { useHash: true });
