import { Doc } from '../verse-note';

export interface NoteGroupSetting {
  categoriesOn: string[];
  categoriesOnPlus?: string[];
  display: boolean;
  enabled: boolean;
  label: string;
  onPlusActive?: boolean;
  overlays: string[];
  title: string;
}
export interface AdditionalSettings {
  settingName: string;
}
export type NoteGroupSettings = Doc & {
  noteGroupSettings: NoteGroupSetting[];
};

export class NoteCategorySetting {
  public name: string;
  public setting: string;
}
export class TruthSetting {
  public label: string;
  public off?: string;
  public on: string;
  public onPlus?: string;
}

export class NoteCategories {
  // tslint:disable:variable-name
  public _id: string;
  public _rev?: string | undefined;
  public noteCategories: NoteCategory[];
  public truthSettings?: TruthSetting[];
  public visibilitySettings: NoteCategorySetting[][];

  public constructor(
    _id: string,
    noteCategories: NoteCategory[],
    visibilitySettings: NoteCategorySetting[][],
  ) {
    this._id = _id;
    this.noteCategories = noteCategories;
    this.visibilitySettings = visibilitySettings;
  }
}
export class NoteCategory {
  public className: string;
  public label: string;
  public name: string;
  public noteCategory: number;
  public off?: string[];
  public on: string[];
  public visible?: boolean;
  public constructor(
    noteCategory: number,
    className: string,
    name: string,
    label: string,
    on: string[],
    off?: string[],
    visible?: boolean,
  ) {
    this.visible = visible;
    this.noteCategory = noteCategory;
    this.className = className;
    this.name = name;
    this.label = label;
    this.on = on;
    this.off = off;
  }
}
export class NoteType {
  public className: string;
  public name: string;
  public shortName: string;
  public noteType: number;
  public visibility: boolean;
  public constructor(
    name: string,
    shortName: string,
    className: string,
    visibility: boolean,
    sort: number,
  ) {
    this.name = name;
    this.shortName = shortName;
    this.className = className;
    this.visibility = visibility;
    this.noteType = sort;
  }
}

export class NoteOverlays {
  public _id: string;
  public _rev?: string;
  public noteTypes: NoteType[];
  public constructor(_id: string, noteTypes: NoteType[]) {
    this._id = _id;
    this.noteTypes = noteTypes;
  }

  /**
   * queryNoteTypeByClassName
   */
}
