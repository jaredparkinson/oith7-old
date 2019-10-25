import {
  map,
  filter,
  flatMap,
  toArray,
  bufferCount,
  retry,
} from 'rxjs/operators';
import { readFile$, writeFile$ } from './fs$';
import { JSDOM } from 'jsdom';
import { fastGlob$, unzipPath, flatMap$, sortPath } from './main';
import { forkJoin, of, EMPTY, Observable } from 'rxjs';
import {
  NoteGroupSettings,
  NoteTypes,
  NoteCategories,
} from './verse-notes/settings/note-gorup-settings';
import { verseNoteProcessor } from './processors/verseNoteProcessor';
import cuid = require('cuid');
import { parseDocID } from './processors/parseDocID';
import { chapterProcessor } from './processors/chapterProcessor';
import cheerio from 'cheerio';
export const filterUndefined$ = filter(
  <T>(o: T) => o !== undefined && o !== null,
);

export function getFileType(document: CheerioStatic): Observable<string> {
  return of(document('html').attr('data-content-type'));
}

export function process(noteTypes: NoteTypes, noteCategories: NoteCategories) {
  return loadFiles().pipe(
    map(d => forkJoin(of(d), getFileType(d))),
    flatMap(o => o),
    map(([d, t]) => {
      d;

      switch (t) {
        case 'chapter':
        case 'figure':
        case 'section':
        // case 'book':
        case 'topic': {
          return chapterProcessor(d).pipe(flatMap$);
        }
        case 'book':
        case 'manifest': {
          break;
        }
        case 'overlay-note': {
          return verseNoteProcessor(d, noteTypes, noteCategories);
          break;
        }
        default: {
          const ti = d('title');
          console.log(t);
          console.log(ti.text()); // ? ti.innerHTML : '');

          // console.log(t);

          return EMPTY;
        }
      }
      return EMPTY;
    }),
    flatMap(o => o),
    bufferCount(100),
    map(o => writeFile$(`${sortPath}/${cuid()}.json`, JSON.stringify(o))),
    toArray(),
  );
  // .pipe(toArray());
}
function loadFiles() {
  return fastGlob$(unzipPath).pipe(
    flatMap$,
    map(o =>
      readFile$(o).pipe(
        map(file => {
          // const s =
          // const t = s('.page-break');
          // const st = s('html').attr('data-uri');
          // if (t.html() !== null && st.trim() !== '') {
          // console.log(st);
          // console.log(t.html());
          // }
          //
          // return new JSDOM(file, {
          // contentType:
          // o.split('.').pop() === 'html' ? 'text/html' : 'text/xml',
          // }).window.document;
          return cheerio.load(file, { xmlMode: true, decodeEntities: false });
        }),
      ),
    ),
    flatMap$,
  );
}
