import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgxCurrencyModule } from "ngx-currency";
import { LOCALE_ID } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FormComponent } from './form/form.component';
import { DataSegmentComponent } from './data-segment/data-segment.component';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { DatabaseService } from './services/database.service';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FormComponent,
    DataSegmentComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    NgxCurrencyModule,
    HttpClientInMemoryWebApiModule.forRoot(
      DatabaseService, { dataEncapsulation: false }
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
