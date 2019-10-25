import { VerseNote } from '../verse-notes/verse-note';
export class Verse {
  public id: string;
  public text: string;

  public constructor(id: string, text: string) {
    this.id = id;
    this.text = text;
  }
}
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
  public verses: Verse[];
  1;
  // public verses: Verse[];
  public constructor(
    _id: string,
    lang: string,
    title: string,
    shortTitle: string,
    testament: string,
    verses: Verse[],
  ) {
    this._id = _id;
    this.lang = lang;
    this.title = title;
    this.shortTitle = shortTitle;
    this.testament = testament;
    this.verses = verses;
  }
}
