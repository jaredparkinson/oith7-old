import { Component, OnInit, Input } from '@angular/core';
import { Note } from '../../../../../oith-lib/src/verse-notes/verse-note';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})
export class NoteComponent implements OnInit {
  @Input() public note: Note;
  constructor() {}

  ngOnInit() {}
}
