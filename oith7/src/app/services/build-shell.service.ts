import { Injectable } from '@angular/core';
import {
  Chapter,
  Verse,
  FormatGroup,
  FormatText,
  FormatMerged
} from '../../../../oith-lib/src/processors/Chapter';
import { of, forkJoin, Observable, EMPTY } from 'rxjs';
import { flatMap$ } from '../../../../oith-lib/src/rx/flatMap$';
import { map, toArray } from 'rxjs/operators';
import { DocType } from '../../../../oith-lib/src/verse-notes/verse-note';

@Injectable({
  providedIn: 'root'
})
export class BuildShellService {
  constructor() {}

  private extractFormatText(
    verse: FormatGroup | Verse | FormatText
  ): Observable<FormatText> {
    if (Array.isArray((verse as FormatGroup | Verse).grps)) {
      return of((verse as FormatGroup | Verse).grps as (
        | FormatGroup
        | FormatText)[]).pipe(
        flatMap$,
        map(o => this.extractFormatText(o)),
        flatMap$
      );
    } else if ((verse as FormatText).docType === DocType.FORMATTEXT) {
      return of(verse as FormatText);
    }
    console.log(verse);

    return EMPTY;
  }

  private addTextToFormatText(verse: Verse, formatText: FormatText) {
    console.log(formatText);
    if (formatText.offsets) {
      const split = formatText.offsets.split('-');
      return of(
        (formatText.formatMerged = [
          new FormatMerged(
            verse.text.slice(parseInt(split[0], 10), parseInt(split[1], 10) + 1)
          )
        ])
      );
    }

    return EMPTY;
  }

  private resetVerse(verse: Verse) {
    return this.extractFormatText(verse).pipe(
      map(o => this.addTextToFormatText(verse, o)),
      flatMap$,
      toArray(),
      map(o => console.log(o))
    );
    // return of(verse).pipe(map(v => console.log(v.grps)));
  }

  private resetVerses(verses: Verse[]) {
    return of(verses).pipe(
      flatMap$,
      map(v => this.resetVerse(v)),
      flatMap$,
      toArray()
    );
  }

  private highlightVerses(verses: Verse[]) {
    return of(verses);
  }

  public buildNewShell(chapter: Chapter) {
    console.log(chapter);

    return forkJoin(this.resetVerses(chapter.verses));
  }
}
