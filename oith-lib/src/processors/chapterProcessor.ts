import { forkJoin, EMPTY, of } from 'rxjs';
import { parseDocID } from './parseDocID';
import { map } from 'rxjs/operators';
import { flatMap$ } from '../rx/flatMap$';

function parseVerse(verseE: Cheerio) {
  console.log(verseE.html());
}

function parseVerses($: CheerioStatic) {
  return of($('body [data-aid]').toArray()).pipe(
    flatMap$,
    map(o => parseVerse($(o))),
  );
}

export function chapterProcessor(document: CheerioStatic) {
  const header = document('header');
  // if (header && header.querySelector('.page-break') !== null) {
  // console.log(header.innerHTML);
  // }
  return forkJoin(parseDocID(document), parseVerses(document)).pipe(
    map(([id]) => {
      id;

      return EMPTY;
    }),
  );
}
