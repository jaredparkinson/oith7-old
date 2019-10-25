import { EMPTY, of, Observable } from 'rxjs';
import { parseLanguage } from './parseLanguage';
import { map } from 'rxjs/operators';
export function parseDocID(docuemnt: CheerioStatic): Observable<string> {
  const htmlE = docuemnt('html');
  if (htmlE && htmlE.attr('data-uri')) {
    const r = /^.+\/(.+?)\/(.+?)(\.html$|$)/g.exec(htmlE.attr(
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
