import { NgModule } from "@angular/core";
import { BuildingComponent } from "./building/building.component";
import { NotFoundComponent } from "./not-found/not-found.component";

@NgModule({
  declarations: [BuildingComponent, NotFoundComponent],
  exports: [BuildingComponent, NotFoundComponent]
})
export class ErrorsModule {}
