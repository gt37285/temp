import {
  Component,
  OnInit,
  Renderer2,
  ElementRef,
  EventEmitter
} from "@angular/core";
import Swal from "sweetalert2";
import { UsuarioModel } from "../../../models/usuarios/usuario.model";
import { ModalService } from "../../../services/modal.service";
import { UsuariosService } from "../../../services/usuarios.service";

@Component({
  selector: "app-modal-upload",
  templateUrl: "./modal-upload.component.html",
  styleUrls: ["./modal-upload.component.scss"]
})
export class ModalUploadComponent implements OnInit {
  public uploadImg: File;
  public imagenTemp: any;

  constructor(private _render: Renderer2, public _modalService: ModalService) { }

  ngOnInit() { }

  cerrarModal(elem: ElementRef) {
    this._render.addClass(elem, "hiddenModal");
    this._modalService.showModal = {
      mostrar: true,
      img: null
    };
  }

  seleccionimg(archivo: File) {
    if (!archivo) {
      return;
    }

    if (archivo.type.indexOf("image") < 0) {
      Swal.fire({
        title: "Error!",
        text: "Solo puedes subir imagenes",
        icon: "warning",
        confirmButtonText: "Cool"
      });
      this.uploadImg = null;
      return;
    }

    this.uploadImg = archivo;

    let reader = new FileReader();
    reader.readAsDataURL(archivo);
    reader.onloadend = () => (this.imagenTemp = reader.result);
  }

  cargarImg(data: any, tipo: string, elem: ElementRef) {
    if (!this.uploadImg) {
      return;
    }

    this._modalService.cargarImg(this.uploadImg, tipo, data._id);
    this.cerrarModal(elem);
    this.uploadImg = null;

    this._modalService.notificacion.emit(true);
  }
}
