import { Component, OnInit, Input, Sanitizer } from '@angular/core';
import { SafeHtml, DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-note-phrase',
  templateUrl: './note-phrase.component.html',
  styleUrls: ['./note-phrase.component.scss']
})
export class NotePhraseComponent implements OnInit {
  @Input() public notePhrase: string;

  public safePhrase?: SafeHtml;
  constructor(public sanitizer: DomSanitizer) {}

  ngOnInit() {
    this.safePhrase = this.sanitizer.bypassSecurityTrustHtml(this.notePhrase);
  }
}
