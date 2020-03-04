import { Component } from "@angular/core";
import { ModalService } from "../../services/modal.service";

@Component({
  selector: "app-pages",
  templateUrl: "./pages.component.html",
  styleUrls: ["./pages.component.scss"]
})
export class PagesComponent {
  public menu: boolean;

  constructor(public _modalServices: ModalService) {}
}
