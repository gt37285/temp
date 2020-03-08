import { Injectable } from "@angular/core";
import { URL_SERVICES } from "../config/config";
import { UsuariosService } from './usuarios.service';

@Injectable({
  providedIn: "root"
})
export class ArchivoService {
  constructor(
  ) { }

  async subirArchivo(archivo: File, tipo: string, id: string, id_usuario?: string) {


    return new Promise((resolve, reject) => {

      /**se construye la url del backend */

      let url = `${URL_SERVICES}/aula/archivo/${tipo}/${id}/${id_usuario}`;

      /**se construye el formulario que se va a enviar */


      let formData = new FormData();
      formData.append("archivo", archivo, archivo.name);

      /**se construye la peticion de ajax */

      let peticion = new XMLHttpRequest();

      peticion.open("POST", url, true);

      peticion.addEventListener("load", () => {
        if (peticion.status == 200 && peticion.readyState == 4) {
          resolve(JSON.parse(peticion.response));
        } else {
          reject(JSON.parse(peticion.response));
        }
      });

      peticion.withCredentials = true

      /**envias el formulario */

      let token = localStorage.getItem("token")
      peticion.setRequestHeader('token', token)
      
      peticion.send(formData);
    });
  }
}
