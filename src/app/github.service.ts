import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {of} from 'rxjs/internal/observable/of';
import {GithubSearchInterface, HandledResponse} from './github-search.interface';

@Injectable({
  providedIn: 'root'
})
export class GithubService {

  constructor(private httpClient: HttpClient) { }
  public getReposList(query: string): Observable<HandledResponse> {
    return this.httpClient.get<GithubSearchInterface>(`https://api.github.com/search/repositories?q=${query}+in:name`)
      .pipe(
        map((resp) => {
          return {items: resp.items, error: null};
        }),
        catchError((error: HttpErrorResponse) => {
          return of({
            items: [],
            error: {
              status: error.status,
              message: error.error && error.error.message ? error.error.message : error.message
            }
          });
        })
      );
  }
}
