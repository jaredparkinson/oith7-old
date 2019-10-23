import { map, filter, flatMap } from 'rxjs/operators';
import { readFile$ } from './fs$';
import { JSDOM } from 'jsdom';
import { fastGlob$, unzipPath, flatMap$ } from './main';
import { forkJoin, of } from 'rxjs';

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

export function process() {
  return loadFiles().pipe(
    map(d => forkJoin(of(d), getFileType(d))),
    flatMap(o => o),
    map(([d, t]) => {
      d;
      console.log(t);
    }),
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
