import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { forkJoin } from 'rxjs';
import { filter, map, flatMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Chapter } from '../../../../../oith-lib/src/processors/Chapter';
@Component({
  selector: 'app-chapter',
  templateUrl: './chapter.component.html',
  styleUrls: ['./chapter.component.scss']
})
export class ChapterComponent implements OnInit {
  public chapter?: Chapter;
  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public httpClient: HttpClient
  ) {}

  public ngOnInit() {
    console.log('oiasjdfoiajsdfoiajsdf');

    this.activatedRoute.params
      .pipe(
        map(params =>
          this.httpClient.get(
            `assets/scripture_files/eng-${params['book']}-${params['chapter']}-chapter.json`,
            { responseType: 'json' }
          )
        ),
        flatMap(o => o)
      )
      .subscribe((o: Chapter) => {
        this.chapter = o;
        console.log(this.chapter);
      });
    return forkJoin(
      // this.router.events.pipe(filter(o => o instanceof NavigationEnd)),
      this.activatedRoute.params
      // this.activatedRoute.queryParams
    ).subscribe(([params]) => {
      console.log(params);
    });
  }
}
