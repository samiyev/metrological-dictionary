import 'zone.js/dist/zone-mix';
import 'reflect-metadata';
import 'polyfills';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HttpClientModule, HttpClient} from '@angular/common/http';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';

import {AppComponent} from './app.component';
import {HomeComponent} from './components/home/home.component';
import {TopComponent} from './components/top/top.component';
import {ContentComponent} from './components/content/content.component';
import {FooterComponent} from './components/footer/footer.component';

import {ElectronService} from './providers/electron.service';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { SearchPipe } from './pipes/search.pipe';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TopComponent,
    ContentComponent,
    FooterComponent,
    SearchPipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (HttpLoaderFactory),
        deps: [HttpClient]
      }
    })
  ],
  providers: [ElectronService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
