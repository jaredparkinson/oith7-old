import { Component, OnInit, Input } from "@angular/core";
import { FormatGroup } from "../../../../../oith-lib/src/processors/Chapter";

@Component({
  selector: "app-img",
  templateUrl: "./img.component.html",
  styleUrls: ["./img.component.scss"]
})
export class ImgComponent implements OnInit {
  @Input() public img: FormatGroup;
  public src: string;
  public alt: string;
  constructor() {}

  ngOnInit() {
    console.log(this.img);
    this.src = `assets/images/${
      this.img.attrs ? this.img.attrs["src"] : ""
    }.jpg`;
    this.alt = this.img.attrs ? this.img.attrs["alt"] : "";
  }
}
