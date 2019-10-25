import { forkJoin, EMPTY, of } from 'rxjs';
import { parseDocID } from './parseDocID';
import { map, flatMap, toArray } from 'rxjs/operators';
import { flatMap$ } from '../rx/flatMap$';
import { Verse, Chapter } from './Chapter';

export const fixLink = map((i: Cheerio) => {
  const output = i.attr('href');
  if (
    output.endsWith(
      'manual/come-follow-me-for-individuals-and-families-new-testament-2019',
    )
  ) {
    i.attr(
      'href',
      `/manual/come-follow-me-for-individuals-and-families-new-testament-2019/title`,
    );
  }
  const r7 = /^.*(manual\/come-follow-me.*)\.html/g.exec(output);

  if (r7) {
    i.attr('href', `/${r7[1]}`);
    return;
  }

  const r2 = /^.*scriptures\/(gs)\/([a-z\d\-]+)\.html#(sec[a-z\d_]+)$/g.exec(
    output,
  );
  if (r2) {
    i.attr('href', `/${r2[1]}/${r2[2]}`);
    return;
  }

  const r3 = /^.*scriptures\/(ot|nt|bofm|dc-testament|pgp)\/([a-z\d\-]+)\/(\d+\.html\?span=[^#]+)#p\d+$/g.exec(
    output,
  );
  if (r3) {
    i.attr('href', `/${r3[2]}/${r3[3]}`);
    return;
  }

  const r4 = /^.*scriptures\/(ot|nt|bofm|dc-testament|pgp)\/([a-z\d\-]+)\/(\d+)\.html\?verse=(note|)(\d+)[a-z]#(note|)\d+[a-z]$/g.exec(
    output,
  );
  if (r4) {
    i.attr('href', `/${r4[2]}/${r4[3]}.${r4[5]}`);
    return;
  }

  const r5 = /^.*scriptures\/(ot|nt|bofm|dc-testament|pgp)\/([a-z\d\-]+)\/(\d+)\.html\?verse=(\d+)&amp;context=([^#]+)#p\d+$/g.exec(
    output,
  );
  if (r5) {
    i.attr('href', `/${r5[2]}/${r5[3]}.${r5[4]}.${r5[5]}`);
    return;
  }
  const r51 = /^.*scriptures\/(ot|nt|bofm|dc-testament|pgp)\/([a-z\d\-]+)\/(\d+)\.html\?verse=([^#]+)#p\d+$/g.exec(
    output,
  );
  if (r51) {
    i.attr('href', `/${r51[2]}/${r51[3]}.${r51[4]}`);
    return;
  }

  const r6 = /^.*scriptures\/(ot|nt|bofm|dc-testament|pgp)\/([a-z\d\-]+)\/(\d+)\.html$/g.exec(
    output,
  );
  if (r6) {
    i.attr('href', `/${r6[2]}/${r6[3]}`);
    return;
  }

  const r61 = /^.*scriptures\/jst\/(jst-[a-z\d\-]+\/\d+)\.html\?verse=([^#]+)#p\d+$/g.exec(
    output,
  );
  if (r61) {
    i.attr('href', `/${r61[1]}`);
    return;
  }

  const r62 = /^.*scriptures(\/(bible|history)-maps\/map-\d+)\.html$/g.exec(
    output,
  );
  if (r62) {
    i.attr('href', `/${r62[1]}`);
    return;
  }

  const r8 = /^.*\/((manual|general-conference|ensign|liahona|new-era|friend).+)/g.exec(
    output,
  );

  if (r8) {
    i.attr('href', `https://churchofjesuschrist.org/study/${r8[1]}/`);
    return;
  }
});

function parseText(e: Cheerio) {
  return of(e.text());
}

function parseID(e: Cheerio, chapID: string) {
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
    toArray(),
  );
}

function fixLinks($: CheerioStatic) {
  return of($('[href]').toArray()).pipe(
    flatMap$,
    map(o => $(o)),
    fixLink,
    toArray(),
  );
}

export function chapterProcessor($: CheerioStatic) {
  const header = $('header');
  return forkJoin(parseDocID($), fixLinks($)).pipe(
    map(([id, i]) => {
      i;
      return forkJoin(parseVerses($, id)).pipe(
        map(([verses]) => {
          console.log(verses.length);

          return new Chapter(id, '', '', '', '', verses);
          // console.log($('[href]').attr('href'));

          // return EMPTY;
        }),
      );
    }),
  );
}
