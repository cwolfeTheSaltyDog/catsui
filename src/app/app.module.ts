import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

// Imports for loading & configuring the in-memory web api
// import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
// import { CatData } from './cats/cat-data';

import { AppComponent } from './app.component';

/* NgRx */
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { environment } from 'src/environments/environment';

/* Feature Modules */
import { UserModule } from './user/user.module';
import { WelcomeComponent } from './home/welcome.component';
import { ShellComponent } from './home/shell.component';
import { MenuComponent } from './home/menu.component';
import { PageNotFoundComponent } from './home/page-not-found.component';
@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    ShellComponent,
    MenuComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
   // HttpClientInMemoryWebApiModule.forRoot(CatData),
    UserModule,
    AppRoutingModule,
    StoreModule.forRoot({}),
    StoreDevtoolsModule.instrument({
      name: 'Cats App DevTools',
      maxAge: 25,
      logOnly: environment.production
    }),
    EffectsModule.forRoot([])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
