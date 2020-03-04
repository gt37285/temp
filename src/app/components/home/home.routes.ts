import { Routes, RouterModule } from "@angular/router";

/**componentes */

import { HomeComponent } from "./home.component";
import { StartComponent } from "./start/start.component";
import { BlogComponent } from "./blog/blog.component";
import { AboutComponent } from "./about/about.component";
import { ContactsComponent } from "./contacts/contacts.component";
import { SigninComponent } from "./signin/signin.component";
import { BuildingComponent } from "../errors/building/building.component";
import { ResetComponent } from './reset/reset.component';

const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
    children: [
      { path: "home", component: StartComponent, data: { titulo: "Home" } },
      // { path: "blog", component: BlogComponent },   /**esta bajo construccion */
      { path: "blog", component: BuildingComponent, data: { titulo: "Blog" } },
      { path: "about", component: AboutComponent, data: { titulo: "About" } },
      // { path: "contacts", component: ContactsComponent }, /**esta bajo construccion */
      {
        path: "contacts",
        component: BuildingComponent,
        data: { titulo: "Contacts" }
      },
      {
        path: "signin",
        component: SigninComponent,
        data: { titulo: "Siginin" }
      },
      {
        path: "reset",
        component: ResetComponent,
        data: { titulo: "Reset" }
      },
      { path: "", pathMatch: "full", redirectTo: "home" }
    ]
  }
];

export const HomeRouterModule = RouterModule.forChild(routes);
