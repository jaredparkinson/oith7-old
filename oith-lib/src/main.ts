import { Observable, of } from 'rxjs';
import { flatMap, map } from 'rxjs/operators';

export class ChapterProcessor {
  public chapterProcessor = map((document: Document) => {
    of(document.querySelectorAll('body > *'));
  });
}

// const inputFolder = of(argv.i as string);

// function main(): void {}

// main();

export const flatMap$ = flatMap(<T>(o: T[] | Observable<T> | Promise<T>) => o);

// export const parseDocument = map(([buffer, extension]: [Buffer, string]) => {});

export function unzip() {
  // of;
}

// of(FastGlob(normalizePath(`${argv.i}/**/**`))).pipe(
//   flatMap$,
//   flatMap$,
//   readFile$,
//   flatMap$,
//   map(p => {}),
// );
