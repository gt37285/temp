import {
  Component,
  Renderer2,
  ElementRef,
  AfterViewInit,
  ViewChild
} from "@angular/core";

@Component({
  selector: "app-nav",
  templateUrl: "./nav.component.html",
  styleUrls: ["./nav.component.scss"]
})
export class NavComponent implements AfterViewInit {
  public mostar_menu: boolean;
  public barra_2: any;

  @ViewChild("container", { static: false }) menu: ElementRef;

  constructor(private render: Renderer2) {
    this.mostar_menu = false;
  }

  mostrar(elem: any) {
    if (!this.mostar_menu) {
      this.render.addClass(elem, "animate");
    } else {
      this.render.removeClass(elem, "animate");
    }
    this.mostar_menu = !this.mostar_menu;
  }

  ocultar(elem) {
    this.render.removeClass(elem, "animate");
    this.mostar_menu = !this.mostar_menu;
  }

  ngAfterViewInit(): void {
    window.addEventListener("scroll", e => {
      if (window.scrollY > 50) {
        this.menu.nativeElement.classList.add("navScroll", "fadeIn");
      } else {
        this.menu.nativeElement.classList.remove("navScroll");
      }
    });
  }
}
