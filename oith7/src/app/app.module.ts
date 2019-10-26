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

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ChapterComponent,
    FormatGroupComponent,
    FormatTextComponent,
    FormatVerseComponent
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class AppModule {}
