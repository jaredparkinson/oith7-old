import { Component, OnInit, Input } from "@angular/core";
import { VerseNoteGroup } from "../../../../../oith-lib/src/verse-notes/verse-note";

@Component({
  selector: "app-note-group",
  templateUrl: "./note-group.component.html",
  styleUrls: ["./note-group.component.scss"]
})
export class NoteGroupComponent implements OnInit {
  @Input() public verseNoteGroup: VerseNoteGroup;
  constructor() {}

  ngOnInit() {}
}
