import { Component, OnInit, Input } from '@angular/core';
import {
  FormatGroup,
  Verse
} from '../../../../../oith-lib/src/processors/Chapter';

@Component({
  selector: 'app-format-verse',
  templateUrl: './format-verse.component.html',
  styleUrls: ['./format-verse.component.scss']
})
export class FormatVerseComponent implements OnInit {
  @Input() verse: Verse;
  constructor() {}

  ngOnInit() {}
}
