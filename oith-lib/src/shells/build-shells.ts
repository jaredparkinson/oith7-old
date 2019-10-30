import { Chapter, FormatGroup, Verse } from '../processors/Chapter';
import { of, EMPTY, Observable, forkJoin } from 'rxjs';
import { filter, map, toArray, find } from 'rxjs/operators';
import { flatMap$ } from '../rx/flatMap$';
import { VerseNote } from '../verse-notes/verse-note';

function findFormatGroupsWithVerseIDs(
  formatGroup: FormatGroup,
  // isBody: boolean,
): Observable<FormatGroup> {
  if (Array.isArray(formatGroup.verseIDs)) {
    console.log(formatGroup.verseIDs);
    if (Array.isArray(formatGroup.grps)) {
      return forkJoin(
        of(formatGroup.grps).pipe(
          flatMap$,
          map(o => findFormatGroupsWithVerseIDs(o)),
          flatMap$,
          toArray(),
        ),
        of([formatGroup]),
      ).pipe(
        flatMap$,
        flatMap$,
      );
    }
    return of(formatGroup);
  } else {
    return of(formatGroup.grps as FormatGroup[]).pipe(
      filter(o => o !== undefined),
      flatMap$,
      map(o => findFormatGroupsWithVerseIDs(o)),
      flatMap$,
    );
  }

  return EMPTY;
}

function findVerse(verses: Verse[], verseID: string) {
  return of(verses).pipe(
    flatMap$,
    find(o => o.id === verseID),
  );
}

export function generateVerseNoteShell(chapter: Chapter) {
  return of(chapter.verses).pipe(
    flatMap$,
    map(v => {
      return (chapter.verseNotes
        ? chapter.verseNotes.find(
            vN =>
              vN.id ===
              `${chapter.id.replace('-chapter', '')}-${v.id}-verse-notes`,
          )
        : undefined) as VerseNote;
    }),
    filter(o => o !== undefined),
    toArray(),
  );
}

export function prepareVerseNotes(verseNotes: VerseNote[]) {}

export function addVersesToBody(chapter: Chapter) {
  return findFormatGroupsWithVerseIDs(chapter.body).pipe(
    map(o => {
      return of(o.verseIDs as string[]).pipe(
        flatMap$,
        map(o => findVerse(chapter.verses, o)),
        flatMap$,
        filter(o => o !== undefined),
        toArray(),
        map(verses => {
          console.log(verses);

          o.verses = verses as Verse[];
        }),
      );
      // (o.verseIDs as string[]).map(vID => {
      //   const verse = chapter.verses.find(v => v.id === vID);
      // });
    }),
    flatMap$,
    toArray(),
  );
}
