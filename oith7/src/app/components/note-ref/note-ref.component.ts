import { Component, OnInit, Input } from '@angular/core';
import { NoteRef } from '../../../../../oith-lib/src/verse-notes/verse-note';

@Component({
  selector: 'app-note-ref',
  templateUrl: './note-ref.component.html',
  styleUrls: ['./note-ref.component.scss']
})
export class NoteRefComponent implements OnInit {
  @Input() public noteRef: NoteRef;
  constructor() {}

  ngOnInit() {}
}
