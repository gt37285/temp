import { Pipe, PipeTransform } from "@angular/core";
import { URL_SERVICES } from "../config/config";

@Pipe({
  name: "imagen"
})
export class ImagenPipe implements PipeTransform {
  transform(img: String, tipo: String = "usuarios"): any {
    return `${URL_SERVICES}/aula/archivo/${tipo}/${img}`;
  }
}
