import { Component, OnInit } from "@angular/core";
import { Router, ActivationEnd } from "@angular/router";
import { map, filter } from "rxjs/operators";
import { Title } from "@angular/platform-browser";

@Component({
  selector: "app-breadcrumbs",
  templateUrl: "./breadcrumbs.component.html",
  styleUrls: ["./breadcrumbs.component.scss"]
})
export class BreadcrumbsComponent implements OnInit {
  public data: any;

  constructor(private _router: Router, private _title: Title) {
    this.routerObservable().subscribe(data => {
      this.data = data;
      this._title.setTitle(data.titulo);
    });
  }

  ngOnInit() {}

  routerObservable() {
    return this._router.events.pipe(
      filter(data => data instanceof ActivationEnd),
      filter((event: ActivationEnd) => event.snapshot.firstChild == null),
      map((data: ActivationEnd) => data.snapshot.data)
    );
  }
}
