import { Component, OnInit, Input } from "@angular/core";
import { FormatGroup } from "../../../../../oith-lib/src/processors/Chapter";
import { of, forkJoin } from "rxjs";
import { filter, map, flatMap, find } from "rxjs/operators";
import { flatMap$ } from "../../../../../oith-lib/src/rx/flatMap$";
import { Router } from "@angular/router";

@Component({
  selector: "app-format-group",
  templateUrl: "./format-group.component.html",
  styleUrls: ["./format-group.component.scss"]
})
export class FormatGroupComponent implements OnInit {
  @Input() public formatGroup: FormatGroup;
  public cls: string = "";
  public hasHref?: boolean;
  constructor(public router: Router) {}

  ngOnInit() {
    forkJoin(this.setAttributes()).subscribe();
  }

  public setAttributes() {
    if (
      this.formatGroup.attrs !== undefined &&
      this.formatGroup.attrs["href"] !== undefined
    ) {
      // console.log(this.formatGroup.attrs/);
    }
    return forkJoin(
      of(this.formatGroup.attrs as {}).pipe(
        filter(o => o !== undefined),
        map(o => {
          this.cls = o["class"] !== undefined ? o["class"] : "";
        })
      ),
      this.checkHref()
    );
  }

  private checkHref() {
    return of(
      (this.hasHref =
        this.formatGroup.attrs &&
        this.formatGroup.attrs["href"] &&
        !(this.formatGroup.attrs["href"] as string).includes("#note"))
    );
  }

  public click() {
    if (this.formatGroup.attrs) {
      if (this.formatGroup.attrs["href"]) {
        return of(
          this.router.navigateByUrl(`${this.formatGroup.attrs["href"]}`)
        )
          .pipe(flatMap$)
          .subscribe();
      }
    }
  }
}
