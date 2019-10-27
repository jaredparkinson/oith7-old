import { Component, OnInit, Input } from '@angular/core';
import { VerseNote } from '../../../../../oith-lib/src/verse-notes/verse-note';

@Component({
  selector: 'app-verse-notes',
  templateUrl: './verse-notes.component.html',
  styleUrls: ['./verse-notes.component.scss']
})
export class VerseNotesComponent implements OnInit {
  @Input() public verseNotes: VerseNote[];
  constructor() {}

  ngOnInit() {}
}
