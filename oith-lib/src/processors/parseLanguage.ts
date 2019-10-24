import { of } from 'rxjs';
export function parseLanguage(docuemnt: Document) {
  const htmlE = docuemnt.querySelector('html');
  if (htmlE && htmlE.hasAttribute('lang')) {
    return of(htmlE.getAttribute('lang') as string);
  }
  throw new Error('No valid lang found');
}
