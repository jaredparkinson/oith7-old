import { EMPTY } from 'rxjs';
export function parseDocID(docuemnt: Document) {
  const htmlE = docuemnt.querySelector('html');
  if (htmlE && htmlE.hasAttribute('data-uri')) {
    const r = /^.+\/(.+?)\/(.+?)(\.html$|$)/g.exec(htmlE.getAttribute(
      'data-uri',
    ) as string);
    console.log(htmlE.getAttribute('data-uri'));

    if (r) {
      console.log(r);
      return EMPTY;
    }
    // console.log(htmlE.innerHTML);

    // return of(htmlE.getAttribute('data-uri') as string);
  }
  throw new Error('No valid data-uri found');
}
