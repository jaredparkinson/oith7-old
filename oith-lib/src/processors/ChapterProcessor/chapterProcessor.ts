import { forkJoin, EMPTY, of, Observable } from 'rxjs';
import { parseDocID } from '../parseDocID';
import { map, flatMap, toArray, filter, retry } from 'rxjs/operators';
import { flatMap$ } from '../../rx/flatMap$';
import { Verse, Chapter, FormatGroup, FormatText } from '../Chapter';
import { DocType } from '../../verse-notes/verse-note';
import { decode } from 'he';

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
  return of(decode(e.text()));
}

function parseVerseFormat(
  $: CheerioStatic,
  verseE: CheerioElement,
  count: { count: number },
): Observable<FormatGroup[] | FormatText[]> {
  const isTextNode = verseE.type === 'text';
  $(verseE)
    .children()
    .toArray().length === 0;
  // console.log(verseE);

  // console.log(b);
  // verseE.n

  if (isTextNode) {
    // console.log(verseE);log
    const txt = decode($(verseE).text());

    const offsets = [count.count, count.count + txt.length];
    let ft: FormatText;
    if (offsets[0] === offsets[1]) {
      ft = {
        id: '',
        offsets: '',
        uncompressedOffsets: undefined,
        docType: DocType.FORMATTEXT,
        // text: '',
      };
    } else {
      ft = {
        id: '',
        offsets: `${count.count}-${count.count + txt.length - 1}`,
        uncompressedOffsets: undefined,
        docType: DocType.FORMATTEXT,
        // text: $(verseE).text(),
      };

      count.count = count.count + txt.length;
    }

    // console.log(ft);

    return of([ft]);
  } else {
    // console.log(
    // $(verseE)
    // .children()
    // .toArray()
    // .map(n => n.children),
    // );

    return of(
      verseE.children,
      // .toArray(),
    ).pipe(
      flatMap$,
      map(i => {
        // console.log(
        //   $(i)
        //     .contents()
        //     .toArray()
        //     .filter(o => o.type === 'text')
        //     .map(o => (o.data ? o.data.length : 0)).length,
        // );

        return forkJoin(of(i), parseVerseFormat($, i, count));
      }),
      flatMap(o => o),
      map(
        ([e, ft]): FormatGroup => {
          // console.log(e.name);

          return {
            attrs: $(e).attr(),
            name: e.name,
            grps: ft,
            verseIDs: undefined,
            verses: undefined,
            docType: DocType.FORMATGROUP,
          };
        },
      ),
      toArray(),
      map(o => o),
    );
  }
}

function parseVerseID(vID: string) {
  const id = /^(p)([0-9]*)/g.exec(vID);
  return `${id ? id[2] : vID}`;
}

function parseID(e: Cheerio) {
  return of(parseVerseID(e.prop('id')));
}

function parseVerse($: CheerioStatic, verseE: CheerioElement) {
  return forkJoin(
    parseID($(verseE)),
    parseText($(verseE)),
    parseVerseFormat($, verseE, { count: 0 }),
  ).pipe(
    map(
      ([id, text, tgs]): Verse => {
        return new Verse(
          id,
          text,
          tgs as FormatGroup[],
          verseE.name.toLowerCase(),
        );
      },
    ),
  );
}

function parseVerses($: CheerioStatic) {
  return of($('body [data-aid]').toArray()).pipe(
    flatMap$,
    map(o => parseVerse($, o)),
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

export function childrenToArray(
  $: CheerioStatic,
  selector: string | CheerioElement | Cheerio,
) {
  return of(
    $(selector)
      .children()
      .toArray(),
  ).pipe(flatMap(o => o));
}

function parseChildren$(
  $: CheerioStatic,
  element: Cheerio,
  cid: string,
): Observable<FormatGroup[]> {
  return of(element.children().toArray()).pipe(
    flatMap$,
    filter(o => typeof $(o).prop('data-aid') === 'undefined'),
    map(o => {
      return forkJoin(
        parseChildren$($, $(o), cid),
        childrenToArray($, o).pipe(
          filter(e => typeof $(e).prop('data-aid') === 'string'),
          map(o => $(o).prop('id') as string),
          map(id => parseVerseID(id)),
          toArray(),
        ),
        of($(o)),
      );
    }),
    flatMap(o => o),
    map(
      ([formatGroups, verseIDS, e]): FormatGroup => {
        const nodeName = $(e).prop('nodeName') as string;
        const cls = $(e).prop('class');
        const f = $(e).attr();
        const l = Object.keys(f).length;

        return {
          name: nodeName,
          grps: formatGroups.length > 0 ? formatGroups : undefined,
          verses: undefined,
          verseIDs: verseIDS.length > 0 ? verseIDS : undefined,
          attrs: l > 0 ? $(e).attr() : undefined,
          docType: DocType.FORMATGROUP,
        };
      },
    ),
    toArray(),
  );
}

function parseBody($: CheerioStatic, cid: string) {
  return forkJoin(
    parseChildren$($, $('body'), cid),
    of($('body')
      .children()
      .toArray()
      .filter(e => typeof $(e).prop('data-aid') === 'string')
      .map(o => $(o).prop('id')) as string[]).pipe(
      flatMap$,
      map(id => parseVerseID(id)),
      toArray(),
    ),
  ).pipe(
    map(
      ([formatGroups, vUd]): FormatGroup => {
        return {
          name: undefined,
          grps: formatGroups.length > 0 ? formatGroups : undefined,
          verses: undefined,
          verseIDs: vUd.length > 0 ? vUd : undefined,
          docType: DocType.FORMATGROUP,
        };
      },
    ),
  );
}

function parseTitle($: CheerioStatic) {
  return of(
    decode(
      $('[type=citation]')
        .first()
        .text(),
    ),
  );
}

function parseShortTitle($: CheerioStatic) {
  return of(decode($('[type*=short-citation]').text()));
}
export function chapterProcessor($: CheerioStatic) {
  const header = $('header');
  return prepChapter($).pipe(
    map(([id]) => {
      return forkJoin(
        of(id),
        fixLinks($),
        parseBody($, id),
        parseTitle($),
        parseShortTitle($),
      );
    }),
    flatMap$,
    map(([id, i, body, t, st]) => {
      body;
      i;
      return forkJoin(parseVerses($)).pipe(
        map(([verses]) => {
          return new Chapter(
            `${id}-chapter`,
            $('html').prop('lang'),
            t,
            st,
            '',
            verses,
            body,
          );
        }),
      );
    }),
  );
}

function removeUnneededClasses($: CheerioStatic) {
  return of(
    ['scripture-ref', 'study-note-ref'].map(s => $(`.${s}`).removeClass(s)),
  );
  // return of(['scripture-ref', 'study-note-ref']).pipe(
  //   flatMap$,
  //   map(selector => {
  //     return of($(`.${selector}`).toArray()).pipe(
  //       map(e => $(e).removeClass(selector)),
  //     );
  //   }),
  //   flatMap(o => o),
  //   toArray(),
  // );
}

function removeUnneededElements($: CheerioStatic) {
  return of(['sup.marker', 'footer.study-notes']).pipe(
    flatMap$,
    map(o => $(o).remove()),
    toArray(),
  );
}

function prepChapter($: CheerioStatic) {
  return forkJoin(removeUnneededClasses($), removeUnneededElements($)).pipe(
    map(() => {
      return forkJoin(parseDocID($));
    }),
    flatMap$,
  );
}
