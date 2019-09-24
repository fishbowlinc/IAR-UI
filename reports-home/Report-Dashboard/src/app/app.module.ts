import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/components/header/header.component'; 
import { CookieService } from 'ngx-cookie-service';
import { UserService } from './shared/services/user-service';
import { ReportComponent } from './core/components/report/report.component';
import { ReportListComponent } from './core/components/report-list/report-list.component';
import {DataService} from '../app/shared/services/data-service.service';
import {SideNavigationService} from '../app/shared/services/side-navigation.service';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';
import { SideNavigationComponent } from './shared/components/side-navigation/side-navigation.component';
import { SafeHtmlPipe } from './shared/pipes/safe-html.pipe';
import { HttpClientModule } from '@angular/common/http'; 

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ReportComponent,
    ReportListComponent,
    SideNavigationComponent,
    SafeHtmlPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot()
  ],
  providers: [
    CookieService,
    UserService,
    DataService,
    SideNavigationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
