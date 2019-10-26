import { VerseNote, Offsets } from '../verse-notes/verse-note';
export class Verse {
  public id: string;
  public text: string;

  public formatGroups: FormatGroup[];
  public constructor(id: string, text: string, formatGroups: FormatGroup[]) {
    this.id = id;
    this.text = text;
    this.formatGroups = formatGroups;
  }
}

export class FormatText implements Offsets {
  public id: string;
  public offsets?: string | undefined;
  public uncompressedOffsets?: number[] | undefined;

  // public off
}
export class FormatGroup {
  public formatGroup?: FormatGroup[];
  public classList: string[];
  public formatText?: FormatText;
  public verseIDs?: string[];
  public verses?: Verse[];
  public attrs?: {};
}

export class Chapter {
  public id: string;
  public _rev?: string | undefined;
  // public chapterVerseBreaks?: ChapterVerseBreaks;
  // public docType = DocTypes.chapter;
  public lang: string;
  public shortTitle: string;
  public testament: string;
  public title: string;
  public body: FormatGroup;

  // public versesFormatGroups:
  public verseNotes?: VerseNote[];
  public verses: Verse[];
  // public verses: Verse[];
  public constructor(
    id: string,
    lang: string,
    title: string,
    shortTitle: string,
    testament: string,
    verses: Verse[],
    body: FormatGroup,
  ) {
    this.id = id;
    this.lang = lang;
    this.title = title;
    this.shortTitle = shortTitle;
    this.testament = testament;
    this.verses = verses;
    this.body = body;
  }
}
