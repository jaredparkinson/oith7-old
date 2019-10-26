import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormatVerseComponent } from './format-verse.component';

describe('FormatVerseComponent', () => {
  let component: FormatVerseComponent;
  let fixture: ComponentFixture<FormatVerseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormatVerseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormatVerseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
