import { Injectable } from "@angular/core";
import { Settings } from "./Settings";

@Injectable({
  providedIn: "root"
})
export class SettingsService {
  public settings: Settings;

  constructor() {}
}
