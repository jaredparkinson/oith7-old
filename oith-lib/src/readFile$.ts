import { Observable, of } from 'rxjs';
import { readFile } from 'fs-extra';
import { flatMap$ } from './main';
export function readFile$(fileName: string): Observable<Buffer> {
  return of(readFile(fileName)).pipe(flatMap$);
}
