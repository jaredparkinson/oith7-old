import {
  NoteOverlays as NoteTypes,
  NoteCategories,
} from '../verse-notes/settings/note-gorup-settings';
import { of, forkJoin } from 'rxjs';
import { flatMap$ } from '../main';
import { flatMap, map, find } from 'rxjs/operators';
import { NoteRef } from '../verse-notes/verse-note';

function parseID(e: Element) {
  if (e.id === '') {
    throw e.innerHTML;
  }
  return of(e.id);
}

function parseNoteType(noteE: Element, noteTypes: NoteTypes) {
  return of(noteTypes.noteTypes).pipe(
    flatMap$,
    find(o => o.className === noteE.className),
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
    return of(nc);
  }
  throw noteRefLabel.innerHTML;
}
function parseNoteRef(noteRefE: Element, noteCategories: NoteCategories) {
  const refLabelE = noteRefE.querySelector('class*="reference-label"');
  if (refLabelE) {
    return parseNoteCategory(refLabelE, noteCategories).pipe(
      map(
        (noteCategory): NoteRef => {
          return new NoteRef(noteCategory, noteRefE.innerHTML);
        },
      ),
    );
  }
  throw refLabelE.innerHTML;
}

function parseNoteMap(
  noteE: Element,
  noteTypes: NoteTypes,
  noteCategories: NoteCategories,
) {}

export function parseNotes(
  verseNoteElement: Element,
  noteTypes: NoteTypes,
  noteCategories: NoteCategories,
) {}

export function parseVerseNote(
  verseNoteElement: Element,
  noteTypes: NoteTypes,
  noteCategories: NoteCategories,
) {
  return forkJoin(parseID(verseNoteElement)).pipe(map(([id]) => {}));
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
  );
}
