import { EMPTY, of, Observable } from 'rxjs';
import { parseLanguage } from './parseLanguage';
import { map } from 'rxjs/operators';
export function parseDocID(docuemnt: Document): Observable<string> {
  const htmlE = docuemnt.querySelector('html');
  if (htmlE && htmlE.hasAttribute('data-uri')) {
    const r = /^.+\/(.+?)\/(.+?)(\.html$|$)/g.exec(htmlE.getAttribute(
      'data-uri',
    ) as string);

    if (r) {
      return parseLanguage(docuemnt).pipe(
        map(l => {
          return `${l}-${r[1]}-${r[2]}`;
        }),
      );
    }
  }
  throw new Error('No valid data-uri found');
}
