import { flatten, range } from 'lodash';
import { Offset } from '../verse-notes/verse-note';
import { of, Observable } from 'rxjs';
import { filterUndefinedNull$ } from '../rx/argv$';
import { flatMap, map, toArray, distinctUntilChanged } from 'rxjs/operators';
import { flatMap$ } from '../main';
export function expandOffsets(offsets: Offset): Observable<number[]> {
  return of(offsets.offsets as string).pipe(
    filterUndefinedNull$,
    flatMap(o => o.replace(/\s/g, '').split(',')),
    map(o => o.split('-')),
    map(o =>
      o.length === 1 || o[0] === o[1]
        ? [parseInt(o[0])]
        : range(parseInt(o[0]), parseInt(o[1]) + 1),
    ),
    flatMap$,
    distinctUntilChanged(),
    toArray(),
    map(o => (offsets.uncompressedOffsets = o)),
  );
}
