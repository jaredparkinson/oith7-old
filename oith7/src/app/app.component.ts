import { Component, HostListener } from "@angular/core";
import { LayoutService } from "./services/layout.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  title = "oith7";

  constructor(public layoutService: LayoutService) {
    this.layoutService.oithMainGridCalc().subscribe();
  }

  @HostListener("window:resize")
  public scroll() {
    this.layoutService.resize().subscribe();
  }
}
