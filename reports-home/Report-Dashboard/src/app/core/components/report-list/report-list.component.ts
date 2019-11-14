import {  Component, OnInit, OnDestroy  } from '@angular/core';
import { Router } from '@angular/router'
import { Report } from '../../models/reports';
import { REPORTLIST } from '../../models/mock-reports';
import { CookieService } from 'ngx-cookie-service';
import { DataService } from 'src/app/shared/services/data-service.service';

@Component({
  selector: 'app-report-list',
  templateUrl: './report-list.component.html',
  styleUrls: ['./report-list.component.css']
})
export class ReportListComponent implements OnInit , OnDestroy {
  reportList = REPORTLIST;
  selectedReport: Report;
  constructor(private router:Router , private dataService:DataService , private cookieService:CookieService) {
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.dataService.setOption(this.selectedReport);
  }
  
  onSelect(report: Report): void {
    this.cookieService.set("eCube", '', new Date("Thu, 01 Jan 1970 00:00:01 GMT"));
    if(report.name === 'Mailing Summary'){
      this.cookieService.set('eCube',  window.btoa('Master Database'));
    }
    if(report.name === 'Member Summary'){
      this.cookieService.set('eCube',  window.btoa('Monthly Summary'));
    }
    
    this.selectedReport = report;
    this.router.navigate(['/reportDashboard']);  
  }

}
