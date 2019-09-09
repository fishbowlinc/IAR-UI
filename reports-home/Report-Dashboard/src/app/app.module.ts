import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/components/header/header.component'; 
import { CookieService } from 'ngx-cookie-service';
import { UserService } from './shared/services/user-service';
import { ReportComponent } from './core/components/report/report.component';
import { ReportListComponent } from './core/components/report-list/report-list.component';
import {DataService} from '../app/shared/services/data-service.service'


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ReportComponent,
    ReportListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    CookieService,
    UserService,
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
