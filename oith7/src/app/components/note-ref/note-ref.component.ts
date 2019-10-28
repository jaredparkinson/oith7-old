import { Component, OnInit, Input } from '@angular/core';
import { NoteRef } from '../../../../../oith-lib/src/verse-notes/verse-note';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { of } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-note-ref',
  templateUrl: './note-ref.component.html',
  styleUrls: ['./note-ref.component.scss']
})
export class NoteRefComponent implements OnInit {
  @Input() public noteRef: NoteRef;

  public safeNoteRef: SafeHtml;
  constructor(public domSanitizer: DomSanitizer) {}

  ngOnInit() {
    of(this.noteRef)
      .pipe(
        filter(o => o !== undefined),
        map(nR => {
          this.safeNoteRef = this.domSanitizer.bypassSecurityTrustHtml(
            nR.text ? nR.text : ''
          );
        })
      )
      .subscribe();
  }
}
