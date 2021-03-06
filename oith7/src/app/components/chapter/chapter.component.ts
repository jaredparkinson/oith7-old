import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, NavigationEnd } from "@angular/router";
import { forkJoin, of } from "rxjs";
import { filter, map, flatMap } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { Chapter } from "../../../../../oith-lib/src/processors/Chapter";

import {
  addVersesToBody,
  generateVerseNoteShell
} from "../../../../../oith-lib/src/shells/build-shells";
import { flatMap$ } from "../../../../../oith-lib/src/rx/flatMap$";
import { BuildShellService } from "src/app/services/build-shell.service";
@Component({
  selector: "app-chapter",
  templateUrl: "./chapter.component.html",
  styleUrls: ["./chapter.component.scss"]
})
export class ChapterComponent implements OnInit {
  public chapter?: Chapter;
  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public httpClient: HttpClient,
    public buildShellService: BuildShellService
  ) {}

  public ngOnInit() {
    this.activatedRoute.params
      .pipe(
        map(params =>
          this.httpClient.get(
            `assets/scripture_files/${
              params["lang"] ? params["lang"] : "eng"
            }-${params["book"]}-${
              (params["chapter"] as string).split(".")[0]
            }-chapter.json`,
            { responseType: "json" }
          )
        ),
        flatMap(o => o),
        map(chapter => {
          this.chapter = chapter as Chapter;

          return forkJoin(
            addVersesToBody(this.chapter),
            generateVerseNoteShell(this.chapter).pipe(
              map(o => ((this.chapter as Chapter).sortVerseNotes = o))
            ),
            this.buildShellService.buildNewShell(this.chapter)
          );
        }),
        flatMap(o => o)
      )
      .subscribe(o => {});
    return forkJoin(
      // this.router.events.pipe(filter(o => o instanceof NavigationEnd)),
      this.activatedRoute.params
      // this.activatedRoute.queryParams
    ).subscribe(([params]) => {});
  }
}
