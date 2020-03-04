import { Injectable, EventEmitter } from "@angular/core";
import { ArchivoService } from "./archivo.service";
import Swal from "sweetalert2";
import { Observable } from "rxjs/internal/Observable";

@Injectable({
  providedIn: "root"
})
export class ModalService {
  public showModal: any;
  public showModalAdd: boolean;
  public notificacion: EventEmitter<any> = new EventEmitter();

  constructor(private _archivoService: ArchivoService) {
    this.showModal = {
      mostrar: true,
      tipo: null,
      data: null
    };

    this.showModalAdd = true;
  }

  cargarImg(archivo: File, tipo: string, id: string) {
    this._archivoService
      .subirArchivo(archivo, tipo, id)
      .then((data: any) => {
        Swal.fire({
          title: "Proceso completado!",
          text: data.message,
          icon: "success",
          confirmButtonText: "Cool"
        });
      })
      .catch(err =>
        Swal.fire({
          title: "Error!",
          text: err,
          icon: "error",
          confirmButtonText: "Cool"
        })
      );
  }
}
