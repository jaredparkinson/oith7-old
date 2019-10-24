import {
  NoteTypes,
  NoteCategories,
} from '../verse-notes/settings/note-gorup-settings';
import { of, forkJoin } from 'rxjs';
import { flatMap$ } from '../main';
import { flatMap, map, find, toArray, filter } from 'rxjs/operators';
import Note, { NoteRef, VerseNote } from '../verse-notes/verse-note';

function parseVerseNoteElementID(element: Element) {
  if (element.id === '') {
    console.log('throw 1');
    throw element.innerHTML;
  }
  return of(element.id);
}

function parseNoteType(noteElement: Element, noteTypes: NoteTypes) {
  return of(noteTypes.noteTypes).pipe(
    flatMap$,
    find(o => o.className === noteElement.className),
    map(o => (o ? o.noteType : -1)),
  );
}

function parseNoteCategory(
  noteRefLabel: Element,
  noteCategories: NoteCategories,
) {
  const nc = noteCategories.noteCategories.find(
    n => n.className === noteRefLabel.className,
  );
  if (nc) {
    noteRefLabel.remove();
    return of(nc.noteCategory);
  }
  console.log(`Not valid ${noteRefLabel.outerHTML}`);
  return of(-1);
  // throw noteRefLabel.innerHTML;
}
function parseNoteRef(noteRefElement: Element, noteCategories: NoteCategories) {
  const refLabelElement = noteRefElement.querySelector(
    '[class*="reference-label"]',
  );
  if (refLabelElement) {
    return parseNoteCategory(refLabelElement, noteCategories).pipe(
      map(
        (noteCategory): NoteRef => {
          return new NoteRef(noteCategory, noteRefElement.innerHTML);
        },
      ),
    );
  }
  console.log('throw 3');
  throw noteRefElement.innerHTML;
}

function parseNotePhrase(noteE: Element) {
  const notePhraseElement = noteE.querySelector('.note-phrase');

  if (notePhraseElement) {
    return of(notePhraseElement.innerHTML);
  }

  console.log('throw 4');
  throw noteE.id;
}

function parseNoteMap(
  noteElement: Element,
  noteTypes: NoteTypes,
  noteCategories: NoteCategories,
) {
  return forkJoin(
    parseNotePhrase(noteElement),
    parseNoteType(noteElement, noteTypes),
    of(noteElement.querySelectorAll('.note-reference')).pipe(
      flatMap(o => o),
      map(nre => {
        return parseNoteRef(nre, noteCategories);
      }),
      flatMap$,
      toArray(),
    ),
  ).pipe(
    map(([notePhrase, noteType, noteRefts]) => {
      return new Note(noteElement.id, noteRefts, noteType, notePhrase);
    }),
  );
}

function parseNotes(
  verseNoteElement: Element,
  noteTypes: NoteTypes,
  noteCategories: NoteCategories,
) {
  return of(verseNoteElement.querySelectorAll('note')).pipe(
    flatMap(o => o),
    map(o => parseNoteMap(o, noteTypes, noteCategories)),
    flatMap$,
    toArray(),
  );
}

function parseVerseNote(
  verseNoteElement: Element,
  noteTypes: NoteTypes,
  noteCategories: NoteCategories,
) {
  return forkJoin(
    parseVerseNoteElementID(verseNoteElement),
    parseNotes(verseNoteElement, noteTypes, noteCategories).pipe(
      filter(o => o.length > 0),
    ),
  ).pipe(
    map(([id, notes]) => {
      return new VerseNote(id, notes);
    }),
  );
}
export function verseNoteProcessor(
  document: Document,
  noteTypes: NoteTypes,
  noteCategories: NoteCategories,
) {
  document;
  noteTypes;
  noteCategories;
  return of(document.querySelectorAll('verse-notes')).pipe(
    flatMap(o => o),
    map(verseNoteElement => {
      return parseVerseNote(verseNoteElement, noteTypes, noteCategories);
    }),
    flatMap$,
  );
}
