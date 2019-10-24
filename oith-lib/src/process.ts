import { map, filter, flatMap, toArray } from 'rxjs/operators';
import { readFile$ } from './fs$';
import { JSDOM } from 'jsdom';
import { fastGlob$, unzipPath, flatMap$ } from './main';
import { forkJoin, of, EMPTY } from 'rxjs';
import {
  NoteGroupSettings,
  NoteOverlays as NoteTypes,
  NoteCategories,
} from './verse-notes/settings/note-gorup-settings';
import { verseNoteProcessor } from './processors/verseNoteProcessor';

export const filterUndefined$ = filter(
  <T>(o: T) => o !== undefined && o !== null,
);

export function getFileType(document: Document) {
  return of(document.querySelector('html') as HTMLHtmlElement).pipe(
    filterUndefined$,
    map(e => e.getAttribute('data-content-type') as string),
    filterUndefined$,
  );
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
        case 'book':
        case 'topic': {
          break;
        }
        case 'manifest': {
          break;
        }
        case 'overlay-note': {
          return verseNoteProcessor(d, noteTypes, noteCategories);
          break;
        }
        default: {
          const ti = d.querySelector('title') as HTMLTitleElement;
          console.log(ti ? ti.innerHTML : '');

          console.log(t);

          return EMPTY;
        }
      }
      return EMPTY;
    }),
    flatMap$,
    toArray(),
    map(o => console.log(o.length)),
  );
  // .pipe(toArray());
}
function loadFiles() {
  return fastGlob$(unzipPath).pipe(
    flatMap$,
    map(o =>
      readFile$(o).pipe(
        map(
          file =>
            new JSDOM(file, {
              contentType:
                o.split('.').pop() === 'html' ? 'text/html' : 'text/xml',
            }).window.document,
        ),
      ),
    ),
    flatMap$,
  );
}