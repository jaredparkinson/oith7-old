import { Chapter } from './Chapter';
import { VerseNote } from '../verse-notes/verse-note';
import { of, forkJoin, Observable } from 'rxjs';
import { flatMap$ } from '../rx/flatMap$';
import { map, filter, toArray, flatMap } from 'rxjs/operators';

export function sort(docs: (Chapter | VerseNote)[]) {
  const verseNotes = docs.filter(doc =>
    doc.id.includes('verse-note'),
  ) as VerseNote[];
  // console.log(docs.map(o => o.id));

  // console.log(verseNotes.map(o => o.id));

  // const chapters = docs.filter()

  return of(docs).pipe(
    flatMap$,
    filter(o => o.id.endsWith('chapter')),
    map(
      (doc: Chapter): Observable<Chapter> => {
        if (doc.verseNotes === undefined) {
          doc.verseNotes = [];
        }
        const splitID = doc.id.split('-');
        splitID.pop();
        const id = `${splitID.join('-')}-`;
        const i = doc.id.replace('-chapter', '-');

        const verseNotes = of(docs).pipe(
          flatMap$,
          filter(o => o.id.includes('verse-note') && o.id.includes(i)),
          map((verseNote: VerseNote) => {
            if (doc.verseNotes) {
              const vNote = doc.verseNotes.find(vn => vn.id === verseNote.id);
              if (vNote) {
                vNote.notes = (vNote.notes ? vNote.notes : []).concat(
                  verseNote.notes ? verseNote.notes : [],
                );
              } else {
                doc.verseNotes.push(verseNote);
              }
            } else {
              doc.verseNotes = [verseNote];
            }
          }),
          toArray(),
        );

        return forkJoin(verseNotes, of(doc)).pipe(map(o => o[1]));
        // const v = (docs.filter(
        //   d => d.id.includes('verse-note') && d.id.includes(id),
        // ) as VerseNote[]).map(verseNote => {
        //   if (doc.verseNotes) {
        //     const vNote = doc.verseNotes.find(vn => vn.id === verseNote.id);
        //     if (vNote) {
        //       vNote.notes = (vNote.notes ? vNote.notes : []).concat(
        //         verseNote.notes ? verseNote.notes : [],
        //       );
        //     } else {
        //       doc.verseNotes.push(verseNote);
        //     }
        //   } else {
        //     doc.verseNotes = [verseNote];
        //   }
        // });

        // return forkJoin(
        //   of(doc),
        //   of(docs).pipe(
        //     flatMap$,
        //     filter(o => o.id.includes('verse-note')),
        //   ),
        // );
      },
    ),
    flatMap$,
    // toArray(),
  );

  console.log(verseNotes.length);
}
