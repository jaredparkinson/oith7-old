import { Injectable } from "@angular/core";
import {
  Chapter,
  Verse,
  FormatGroup,
  FormatText,
  FormatMerged
} from "../../../../oith-lib/src/processors/Chapter";
import { of, forkJoin, Observable, EMPTY } from "rxjs";
import { flatMap$ } from "../../../../oith-lib/src/rx/flatMap$";
import { map, toArray, groupBy, mergeMap, flatMap } from "rxjs/operators";
import {
  DocType,
  VerseNote,
  VerseNoteGroup
} from "../../../../oith-lib/src/verse-notes/verse-note";

@Injectable({
  providedIn: "root"
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

    return EMPTY;
  }

  private addTextToFormatText(verse: Verse, formatText: FormatText) {
    // console.log(formatText);
    if (formatText.offsets) {
      const split = formatText.offsets.split("-");
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
      map(o => o)
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

  private generateVerseNoteGroups(verseNotea?: VerseNote[]) {
    if (verseNotea) {
      return of(verseNotea).pipe(
        flatMap$,
        map(vN => {
          if (vN.notes) {
            return of(vN.notes).pipe(
              flatMap$,
              groupBy(n => n.phrase),
              mergeMap(o =>
                o.pipe(
                  toArray(),
                  map(
                    (notes): VerseNoteGroup => {
                      const n = notes.sort((a, b) => a.noteType - b.noteType);
                      return new VerseNoteGroup(notes, "");
                    }
                  )
                )
              ),
              toArray(),
              map(ng => {
                console.log(ng);
                vN.noteGroups = ng;
              })
            );
          }
          return EMPTY;
        }),
        flatMap(o => o),
        toArray()
      );
    }

    return EMPTY;
  }

  public buildNewShell(chapter: Chapter) {
    console.log(chapter);

    return forkJoin(
      this.resetVerses(chapter.verses),
      this.generateVerseNoteGroups(chapter.verseNotes)
    );
  }
}
