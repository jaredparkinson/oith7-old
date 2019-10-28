import { Injectable } from '@angular/core';
import { SafeStyle, DomSanitizer } from '@angular/platform-browser';
import { of, forkJoin } from 'rxjs';
import { SettingsService } from './settings.service';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {
  public oithMainGrid: SafeStyle = '';

  constructor(
    private sanitizer: DomSanitizer,
    private settingsService: SettingsService
  ) {}

  public resize() {
    return forkJoin(this.oithMainGridCalc());
  }
  public oithMainGridCalc() {
    return of(
      (this.oithMainGrid = this.sanitizer.bypassSecurityTrustStyle(
        'grid-template-rows: 0 48px calc(100vh - 48px )'
      ))
    );
  }

  private getLayoutMode() {}
}

export const enum LayoutMode {
  Mobile,
  Medium,
  MediumNotes,
  LargeNavNotes,
  LargeNav,
  LargeNote
}
