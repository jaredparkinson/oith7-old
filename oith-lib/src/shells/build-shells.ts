import { Chapter, FormatGroup, Verse } from '../processors/Chapter';
import { of, EMPTY, Observable } from 'rxjs';
import { filter, map, toArray, find } from 'rxjs/operators';
import { flatMap$ } from '../rx/flatMap$';

function findFormatGroupsWithVerseIDs(
  formatGroup: FormatGroup,
): Observable<FormatGroup> {
  if (Array.isArray(formatGroup.verseIDs)) {
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

export function addVersesToBody(chapter: Chapter) {
  findFormatGroupsWithVerseIDs(chapter.body)
    .pipe(
      map(o => {
        return of(o.verseIDs as string[]).pipe(
          flatMap$,
          map(o => findVerse(chapter.verses, o)),
          flatMap$,
          filter(o => o !== undefined),
          toArray(),
          map(verses => {
            o.verses = verses as Verse[];
            console.log(verses);
          }),
        );
        // (o.verseIDs as string[]).map(vID => {
        //   const verse = chapter.verses.find(v => v.id === vID);
        //   console.log(verse);
        // });
      }),
      flatMap$,
      toArray(),
    )
    .subscribe();
}
