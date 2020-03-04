import { UsuarioModel } from "../../../models/usuarios/usuario.model";
import { UsuariosService } from "../../../services/usuarios.service";
import { Router } from "@angular/router";
import {
  Component,
  OnInit,
  Renderer2,
  Output,
  EventEmitter
} from "@angular/core";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"]
})
export class NavbarComponent implements OnInit {
  private menu: boolean;
  public usuario: UsuarioModel;
  public accesos:any

  constructor(
    private _render: Renderer2,
    private _service: UsuariosService,
    private _router: Router
  ) {
    this.menu = false;
    this.usuario = this._service.user;
  }

  @Output() sidebar = new EventEmitter<boolean>();

  ngOnInit() {
    this.accesos = this._service.accesos
  }

  showSearch(elem: any) {
    this._render.addClass(elem, "show_search");
  }

  hiddenSearch(elem: any) {
    this._render.removeClass(elem, "show_search");
  }

  sidebarEmit(elem: any) {
    // elem.classList.toggle("hidden_sub");
    this.menu = !this.menu;
    this.sidebar.emit(this.menu);
  }

  buscar(termino: string) {
    this._router.navigate(["/aula/buscador", termino]);
  }
}
