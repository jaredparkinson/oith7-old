import { Observable, of, forkJoin } from 'rxjs';
import { flatMap, map, filter, toArray } from 'rxjs/operators';
import { emptyDir } from 'fs-extra';
import normalizePath = require('normalize-path');
import { emptyDir$, readFileMap, writeFile$ } from './fs$';
import { argv$ } from './rx/argv$';
import { argv } from 'yargs';
import FastGlob from 'fast-glob';
import AdmZip from 'adm-zip';
import cuid = require('cuid');
import { process } from './process';
export class ChapterProcessor {
  public chapterProcessor = map((document: Document) => {
    of(document.querySelectorAll('body > *'));
  });
}

const cache = normalizePath('./.cache');
export const unzipPath = normalizePath(`${cache}/unzip`);
const flatPath = normalizePath(`${cache}/unzip`);

// const inputFolder = of(argv.i as string);

// function main(): void {}

// main();
export function hasArg(arg: string, argType: string) {
  return of(typeof argv[arg] === argType).pipe(filter(o => o));
}

export function prepCache() {
  return emptyDir$(cache).pipe(
    map(() => forkJoin(emptyDir$(unzipPath), emptyDir$(flatPath))),
    flatMap$,
  );
}

export const flatMap$ = flatMap(<T>(o: T[] | Observable<T> | Promise<T>) => o);
export function normalizePath$(pathName: string) {
  return of(normalizePath(pathName));
}
export function fastGlob$(pathName: string): Observable<string[]> {
  return normalizePath$(`${pathName}/**/**`).pipe(
    map(o => FastGlob(o)),
    flatMap$,
    // flatMap$,
  );
}

export function endsWith(i: string[], val: string) {
  return i.filter(o => val.endsWith(o)).length > 0;
}

export function unzipFiles(pathName: string): Observable<void[]> {
  return fastGlob$(pathName)
    .pipe(
      flatMap$,
      filter(o => o.endsWith('.zip')),
      readFileMap,
      flatMap$,
      flatMap(o => new AdmZip(o).getEntries()),
      filter(o => endsWith(['.xml', '.html'], o.name)),
    )
    .pipe(
      map(o =>
        writeFile$(
          normalizePath(`${unzipPath}/${cuid()}.${o.name.split('.').pop()}`),
          o.getData(),
        ),
      ),
      flatMap$,
      toArray(),
    );
  // return fast
}

forkJoin(hasArg('ns', 'string'), hasArg('i', 'string'))
  .pipe(
    map(() => prepCache()),
    flatMap$,
    map(() => unzipFiles(argv.i as string)),
    flatMap$,
    map(() => process()),
    flatMap(o => o),
  )
  .subscribe(o => o);

// export const parseDocument = map(([buffer, extension]: [Buffer, string]) => {});

// of(FastGlob(normalizePath(`${argv.i}/**/**`))).pipe(
//   flatMap$,
//   flatMap$,
//   readFile$,
//   flatMap$,
//   map(p => {}),
// );
