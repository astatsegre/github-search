import {Component, OnDestroy, OnInit} from '@angular/core';
import {GithubService} from '../github.service';
import {FormControl} from '@angular/forms';
import {debounceTime, filter, switchMap} from 'rxjs/operators';
import {distinctUntilChanged} from 'rxjs/internal/operators/distinctUntilChanged';
import {Subscription} from 'rxjs';
import {HandledResponse} from '../github-search.interface';

@Component({
  selector: 'app-github-search',
  templateUrl: './github-search.component.html',
  styleUrls: ['./github-search.component.css']
})
export class GithubSearchComponent implements OnInit, OnDestroy {

  public results = [];
  public noMatches = false;
  public error: {status: number, message: string};
  public search = new FormControl('');
  public input$: Subscription;
  public isLoading = false;

  constructor(private githubService: GithubService) {
  }
  public ngOnInit(): void {
    this.input$ = this.search.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        filter((val: string) => {
          if (val.length > 2) {
            return true;
          }
          this.results = [];
          this.noMatches = false;
          this.error = null;
          this.isLoading = false;
        }),
        switchMap((val: string) => {
          this.results = [];
          this.noMatches = false;
          this.isLoading = true;
          return this.githubService.getReposList(val);
        }))
      .subscribe((resp: HandledResponse) => {
        if (!this.isLoading) return;
        this.results = resp.items;
        this.noMatches = resp.items.length === 0;
        this.error = resp.error;
        this.isLoading = false;
      });
  }
  public ngOnDestroy(): void {
    this.input$.unsubscribe();
  }
}
