import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {
  APP_INITIALIZER,
  CUSTOM_ELEMENTS_SCHEMA,
  NO_ERRORS_SCHEMA
} from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ChapterComponent } from './components/chapter/chapter.component';
import { FormatGroupComponent } from './components/format-group/format-group.component';
import { FormatTextComponent } from './components/format-text/format-text.component';
import { FormatVerseComponent } from './components/format-verse/format-verse.component';
import { HttpClientModule } from '@angular/common/http';
import { VerseNotesComponent } from './components/verse-notes/verse-notes.component';
import { VerseNoteComponent } from './components/verse-note/verse-note.component';
import { NoteComponent } from './components/note/note.component';
import { NotePhraseComponent } from './components/note-phrase/note-phrase.component';
import { NoteRefComponent } from './components/note-ref/note-ref.component';
import { NoteGroupComponent } from './components/note-group/note-group.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ChapterComponent,
    FormatGroupComponent,
    FormatTextComponent,
    FormatVerseComponent,
    VerseNotesComponent,
    VerseNoteComponent,
    NoteComponent,
    NotePhraseComponent,
    NoteRefComponent,
    NoteGroupComponent
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class AppModule {}
