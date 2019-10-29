import { Component, OnInit, Input } from "@angular/core";
import { FormatText } from "../../../../../oith-lib/src/processors/Chapter";

@Component({
  selector: "app-format-text",
  templateUrl: "./format-text.component.html",
  styleUrls: ["./format-text.component.scss"]
})
export class FormatTextComponent implements OnInit {
  @Input() public formatText: FormatText;
  constructor() {}

  ngOnInit() {}
}
