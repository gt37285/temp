import { NgModule } from "@angular/core";

/**pipes */
import { passwordPipe } from "./password.pipe";
import { ImagenPipe } from "./imagen.pipe";
import { CapitalizarPipe } from "./capitalizar.pipe";
import { NickPipe } from "./nick.pipe";
import { DomSeguroPipe } from './dom-seguro.pipe';
import { ArchivosPipe } from './archivos.pipe';
import { DescargaPipe } from './descarga.pipe';
import { TelefonoPipe } from './telefono.pipe';
import { FechadatetimePipe } from './fechadatetime.pipe';

@NgModule({
  declarations: [passwordPipe, ImagenPipe, CapitalizarPipe, NickPipe, DomSeguroPipe, ArchivosPipe, DescargaPipe, TelefonoPipe, FechadatetimePipe],
  imports: [],
  exports: [passwordPipe, ImagenPipe, CapitalizarPipe, NickPipe, DomSeguroPipe, ArchivosPipe, DescargaPipe, TelefonoPipe,FechadatetimePipe]
})
export class PipesModule { }
