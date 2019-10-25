import { forkJoin, EMPTY, of } from 'rxjs';
import { parseDocID } from './parseDocID';
import { map, flatMap } from 'rxjs/operators';
import { flatMap$ } from '../rx/flatMap$';
import { Verse } from './Chapter';

function parseText(e: Cheerio) {
  return of(e.text());
}

function parseID(e: Cheerio, chapID: string) {
  console.log(e.attr('id'));
  const id = /^(p)([0-9]*)/g.exec(e.attr('id'));
  return of(`${chapID}-${id ? id[2] : e.attr('id')}-verse`);
}

function parseVerse(verseE: Cheerio, chapID: string) {
  return forkJoin(parseID(verseE, chapID), parseText(verseE)).pipe(
    map(
      ([id, text]): Verse => {
        return new Verse(id, text);
      },
    ),
  );
}

function parseVerses($: CheerioStatic, chapID: string) {
  return of($('body [data-aid]').toArray()).pipe(
    flatMap$,
    map(o => parseVerse($(o), chapID)),
    flatMap$,
  );
}

export function chapterProcessor($: CheerioStatic) {
  const header = $('header');
  // if (header && header.querySelector('.page-break') !== null) {
  // console.log(header.innerHTML);
  // }
  return forkJoin(parseDocID($)).pipe(
    map(([id]) => {
      id;
      return forkJoin(parseVerses($, id)).pipe(
        map(([verses]) => {
          verses;
          console.log(verses);

          console.log($('[data-aid]').attr('id'));

          return EMPTY;
        }),
      );
    }),
  );
}
