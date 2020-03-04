import { Component, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { Router, ActivationEnd } from "@angular/router";
import { filter, map } from "rxjs/operators";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html"
})
export class HomeComponent implements OnInit {
  public data: any;
  constructor(private _router: Router, private _title: Title) {
    this.getRouterObservable().subscribe(data => {
      this.data = data;
      this._title.setTitle(data.titulo);
    });
  }

  ngOnInit() {}

  getRouterObservable() {
    return this._router.events.pipe(
      filter(data => data instanceof ActivationEnd),
      filter((event: ActivationEnd) => event.snapshot.firstChild == null),
      map((data: ActivationEnd) => data.snapshot.data)
    );
  }
}
