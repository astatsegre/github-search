import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {ReactiveFormsModule} from '@angular/forms';
import {GithubService} from './github.service';
import {HttpClientModule} from '@angular/common/http';
import { GithubSearchComponent } from './github-search/github-search.component';

@NgModule({
  declarations: [
    AppComponent,
    GithubSearchComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [GithubService],
  bootstrap: [AppComponent]
})
export class AppModule { }
