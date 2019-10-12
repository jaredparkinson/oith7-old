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
