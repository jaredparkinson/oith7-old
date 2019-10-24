import { forkJoin, EMPTY } from 'rxjs';
import { parseDocID } from './parseDocID';
import { map } from 'rxjs/operators';
import { VerseNote } from '../verse-notes/verse-note';

export class Chapter {
  public _id: string;
  public _rev?: string | undefined;
  // public chapterVerseBreaks?: ChapterVerseBreaks;
  // public docType = DocTypes.chapter;
  public lang: string;
  public shortTitle: string;
  public testament: string;
  public title: string;

  // public versesFormatGroups:
  public verseNotes?: VerseNote[];
  1;
  // public verses: Verse[];
  public constructor(
    _id: string,
    lang: string,
    title: string,
    shortTitle: string,
    testament: string,
  ) {
    this._id = _id;
    this.lang = lang;
    this.title = title;
    this.shortTitle = shortTitle;
    this.testament = testament;
  }
}

export function chapterProcessor(document: Document) {
  const header = document.querySelector('header');
  if (header && header.querySelector('.page-break') !== null) {
    console.log(header.innerHTML);
  }
  return forkJoin(parseDocID(document)).pipe(
    map(([id]) => {
      id;

      return EMPTY;
    }),
  );
}
