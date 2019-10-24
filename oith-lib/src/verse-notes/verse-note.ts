import cuid = require('cuid');
import { expandOffsets } from '../offsets/expandOffsets';
import { NoteCategory } from './settings/note-gorup-settings';

export const enum DocType {
  VERSENOTE,
  NOTE,
}
export class Doc {
  public id: string;
  public docType: DocType;
}

export class NoteRef {
  public noteCategory?: number;
  public text?: string;
  public visible?: boolean;
  public constructor(noteC: number, text: string) {
    this.noteCategory = noteC;
    this.text = text;
  }
}

export default class Note {
  public _rev?: string;
  public id: string;
  public formatTag: FormatTagHighlight;
  public href?: string;
  public notePhrase: string;
  public noteRefs: NoteRef[];
  public noteType: number;

  public constructor(
    vid: string,
    noteRefs: NoteRef[],
    noteType: number,
    notePhrase: string,
  ) {
    this.id = vid;
    this.notePhrase = notePhrase;
    this.noteRefs = noteRefs;
    this.noteType = noteType;
  }
}

export class VerseNoteGroup {
  public id: string;
  public formatTag: FormatTagNoteOffsets;
  public noteGroupID = cuid();
  public notePhrase: string;

  public notes: Note[] = [];
  public offsets: string;

  public constructor(note: Note, id: string) {
    this.offsets =
      note.formatTag.offsets && note.formatTag.offsets !== ''
        ? note.formatTag.offsets
        : '100000';
    this.id = id;
    this.notePhrase = note.notePhrase ? note.notePhrase : '';
    this.notes.push(note);
  }
}

export class VerseNote extends Doc {
  public id: string;
  public _rev?: string;
  public docType = DocType.VERSENOTE;
  public noteGroups?: VerseNoteGroup[];
  public notes?: Note[];
  public notesProperties?: FormatTagHighlight[];
  public visible?: boolean;

  public constructor(id: string, notes: Note[]) {
    super();
    this.id = id;

    this.notes = notes;
  }
}

export const enum FormatTagType {
  VERSENUMBER = 0,
  ITALIC,
  BOLD,
  SUBORDINATE,
  CLARITYWORD,
  TRANSLIT,
  LANGUAGE,
  DEITYNAME,
  SMALLCAPS,
  UPPERCASE,
  ENTRY,
  CLOSING,
  SIGNATURE,
  SHORTTITLE,
  BREAK,
  SALUTATION,
  OFFICE,
  DATE,
  ADDRESSEE,
  ANSWER,
  QUESTION,
  SELAH,
  POETRY,
  PROSE,
  DOMINANT,
  UPPERCASEDEITYNAME,
  UNDERLINEYELLOW,
  UNDERLINEBLUE,
  UNDERLINEGREEN,
  UNDERLINERED,
  UNDERLINEPURPLE,
  UNDERLINEORANGE,
  UNDERLINEPINK,
  UNDERLINEGRAY,
  UNDERLINEBROWN,
  UNDERLINEDARKBLUE,
  HIGHLIGHTDARKBLUE,
  HIGHLIGHTBROWN,
  HIGHLIGHTGRAY,
  HIGHLIGHTPINK,
  HIGHLIGHTYELLOW,
  HIGHLIGHTORANGE,
  HIGHLIGHTBLUE,
  HIGHLIGHTPURPLE,
  HIGHLIGHTGREEN,
  HIGHLIGHTRED,
  REFSINGLE,
  REFMULTI,
  INSERTION,
  DELETION,
  NOTE,
  GEOGRAPHY,
  PRONUNCIATION,
  PARAMARK,
  EM,
  NOTEOFFSETS,
  NOTEOFFSETSPRONUNCIATION,
}
export class FormatTagTypeSetting {
  public className: string;
  public formatTagType: FormatTagType;
}
export const FORMATTAGTYPESETTINGS: FormatTagTypeSetting[] = [
  {
    className: 'verse-number',
    formatTagType: FormatTagType.VERSENUMBER,
  },
  {
    className: 'italic',

    formatTagType: FormatTagType.ITALIC,
  },
  {
    className: 'bold',

    formatTagType: FormatTagType.BOLD,
  },
  {
    className: 'subordinate',

    formatTagType: FormatTagType.SUBORDINATE,
  },
  {
    className: 'clarity-word',

    formatTagType: FormatTagType.CLARITYWORD,
  },
  {
    className: 'translit',

    formatTagType: FormatTagType.TRANSLIT,
  },
  {
    className: 'language',

    formatTagType: FormatTagType.LANGUAGE,
  },
  {
    className: 'deity-name',

    formatTagType: FormatTagType.DEITYNAME,
  },
  {
    className: 'small-caps',

    formatTagType: FormatTagType.SMALLCAPS,
  },
  {
    className: 'uppercase',

    formatTagType: FormatTagType.UPPERCASE,
  },
  {
    className: 'entry',

    formatTagType: FormatTagType.ENTRY,
  },
  {
    className: 'closing',

    formatTagType: FormatTagType.CLOSING,
  },
  {
    className: 'signature',

    formatTagType: FormatTagType.SIGNATURE,
  },
  {
    className: 'shorttitle',

    formatTagType: FormatTagType.SHORTTITLE,
  },
  {
    className: 'salutation',

    formatTagType: FormatTagType.SALUTATION,
  },
  {
    className: 'office',

    formatTagType: FormatTagType.OFFICE,
  },
  {
    className: 'date',

    formatTagType: FormatTagType.DATE,
  },
  {
    className: 'addressee',

    formatTagType: FormatTagType.ADDRESSEE,
  },
  {
    className: 'answer',

    formatTagType: FormatTagType.ANSWER,
  },
  {
    className: 'question',

    formatTagType: FormatTagType.QUESTION,
  },
  {
    className: 'selah',

    formatTagType: FormatTagType.SELAH,
  },
  {
    className: 'dominant',

    formatTagType: FormatTagType.DOMINANT,
  },
  {
    className: 'uppercase-deityname',

    formatTagType: FormatTagType.UPPERCASEDEITYNAME,
  },
  {
    className: 'underline-yellow',

    formatTagType: FormatTagType.UNDERLINEYELLOW,
  },
  {
    className: 'underline-blue',

    formatTagType: FormatTagType.UNDERLINEBLUE,
  },
  {
    className: 'underline-green',

    formatTagType: FormatTagType.UNDERLINEGREEN,
  },
  {
    className: 'underline-red',

    formatTagType: FormatTagType.UNDERLINERED,
  },
  {
    className: 'underline-purple',

    formatTagType: FormatTagType.UNDERLINEPURPLE,
  },
  {
    className: 'underline-orange',

    formatTagType: FormatTagType.UNDERLINEORANGE,
  },
  {
    className: 'underline-pink',

    formatTagType: FormatTagType.UNDERLINEPINK,
  },
  {
    className: 'underline-gray',

    formatTagType: FormatTagType.UNDERLINEGRAY,
  },
  {
    className: 'underline-brown',

    formatTagType: FormatTagType.UNDERLINEBROWN,
  },
  {
    className: 'underline-darkblue',

    formatTagType: FormatTagType.UNDERLINEDARKBLUE,
  },
  {
    className: 'highlight-darkblue',

    formatTagType: FormatTagType.HIGHLIGHTDARKBLUE,
  },
  {
    className: 'highlight-brown',

    formatTagType: FormatTagType.HIGHLIGHTBROWN,
  },
  {
    className: 'highlight-gray',

    formatTagType: FormatTagType.HIGHLIGHTGRAY,
  },
  {
    className: 'highlight-pink',

    formatTagType: FormatTagType.HIGHLIGHTPINK,
  },
  {
    className: 'highlight-yellow',

    formatTagType: FormatTagType.HIGHLIGHTYELLOW,
  },
  {
    className: 'highlight-orange',

    formatTagType: FormatTagType.HIGHLIGHTORANGE,
  },
  {
    className: 'highlight-blue',

    formatTagType: FormatTagType.HIGHLIGHTBLUE,
  },
  {
    className: 'highlight-purple',

    formatTagType: FormatTagType.HIGHLIGHTPURPLE,
  },
  {
    className: 'highlight-green',

    formatTagType: FormatTagType.HIGHLIGHTGREEN,
  },
  {
    className: 'highlight-red',

    formatTagType: FormatTagType.HIGHLIGHTRED,
  },
  {
    className: 'refsingle',

    formatTagType: FormatTagType.REFSINGLE,
  },
  {
    className: 'refmulti',

    formatTagType: FormatTagType.REFMULTI,
  },
  {
    className: 'insertion',

    formatTagType: FormatTagType.INSERTION,
  },
  {
    className: 'deletion',

    formatTagType: FormatTagType.DELETION,
  },
  {
    className: 'note',

    formatTagType: FormatTagType.NOTE,
  },
  {
    className: 'geography',

    formatTagType: FormatTagType.GEOGRAPHY,
  },
  {
    className: 'pronunciation',

    formatTagType: FormatTagType.PRONUNCIATION,
  },

  {
    className: 'para-mark',

    formatTagType: FormatTagType.PARAMARK,
  },
  {
    className: 'i',

    formatTagType: FormatTagType.ITALIC,
  },
  {
    className: 'em',

    formatTagType: FormatTagType.EM,
  },
];

export abstract class Formating {
  public formatType: FormatTagType;
  public offsets?: string;

  public uncompressedOffsets?: number[];
  public uncompressedOffsets2?: { first: number; last: number }[];
  public visible?: boolean;
  public constructor(formatType: FormatTagType, offsets: string) {
    this.formatType = formatType;

    this.offsets = offsets;
  }
}

export class FormatTagHighlight extends Formating {
  // public note
  public highlight?: boolean;
  public url?: string;
  public constructor(formatType: FormatTagType, offsets: string) {
    super(formatType, offsets);
  }
}
export class FormatTag extends Formating {
  public _id?: string;
  public pronunciation?: boolean;
  public constructor(
    formatType: FormatTagType,
    offsets: string,
    uncompressedOffsets?: number[],
  ) {
    super(formatType, offsets);
    this.uncompressedOffsets = uncompressedOffsets;
  }
}

export class FormatTagNoteOffsets extends FormatTag {
  public _id: string;
  public formatType = FormatTagType.NOTEOFFSETS;
  public highlight?: boolean;
  public noteGroupID: string;
  public uncompressedOffsets: number[];
  public constructor(
    offsets: string,
    _id: string,
    noteGroupID: string,
    formatType?: FormatTagType,
  ) {
    super(FormatTagType.NOTEOFFSETS, offsets);
    this.noteGroupID = noteGroupID;
    this._id = _id;
    if (formatType) {
      this.formatType = formatType;
    }
    expandOffsets(this);
  }
}
export class FormatTagNotePronunciation extends FormatTagNoteOffsets {
  public formatType = FormatTagType.NOTEOFFSETSPRONUNCIATION;
  public href?: string;
  public underline: boolean;
  public constructor(
    offsets: string,
    _id: string,
    noteGroupID: string,
    notes: Note[],
  ) {
    super(offsets, _id, offsets, FormatTagType.NOTEOFFSETSPRONUNCIATION);
    this.noteGroupID = noteGroupID;
    this._id = _id;
    const note = notes.find(note => note.href !== undefined);
    if (note) {
      this.href = note.href;
    }
    expandOffsets(this);
  }
}

export class FormatTagUrl extends FormatTagHighlight {
  public url: string;
  public constructor(formatType: FormatTagType, url: string, offsets: string) {
    super(formatType, offsets);
    this.url = url;
  }
}

export interface Offset {
  offsets?: string;
  uncompressedOffsets?: number[];
  uncompressedOffsets2?: FirstLast[];
}

export interface FirstLast {
  first: number;
  last: number;
}

export class Offsets implements Offset {
  public _id: string;
  public offsets?: string;
  public uncompressedOffsets?: number[];
}

export class OffsetGroup {
  // public _id: string;
  // public noteProperities?: NoteProperities;
  public notePhrase: string;
  public offsets?: Offsets[];
}
