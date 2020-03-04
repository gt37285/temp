import { UsuariosService } from "../../../services/usuarios.service";
import { OnInit } from "@angular/core";
import { UsuarioModel } from "../../../models/usuarios/usuario.model";
import {
  Component,
  Input,
  OnChanges,
  Renderer2,
  ElementRef,
  ViewChild
} from "@angular/core";

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.scss"]
})
export class SidebarComponent implements OnChanges, OnInit {
  public usuario: UsuarioModel;
  public items: any;

  @ViewChild("sidebar", { static: true }) sidebar: ElementRef;

  @Input() menu: boolean;

  constructor(private _render: Renderer2, public _service: UsuariosService) {}

  ngOnInit() {
    this.usuario = this._service.user;
    this.items = this._service.menu;
  }

  ngOnChanges() {
    this.menu
      ? this._render.addClass(this.sidebar.nativeElement, "show-sidebar")
      : this._render.removeClass(this.sidebar.nativeElement, "show-sidebar");
  }

  desplegar(icon: any, child: any) {
    icon.classList.toggle("active_menu_child");
    if (child.style.maxHeight) {
      child.style.maxHeight = null;
    } else {
      child.style.maxHeight = child.scrollHeight + "px";
    }
  }
}
