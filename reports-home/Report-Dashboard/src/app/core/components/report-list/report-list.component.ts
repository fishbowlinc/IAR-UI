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
    if(report.name === 'Mailing Summary'){
      this.cookieService.set("member summary", '', new Date("Thu, 01 Jan 1970 00:00:01 GMT"));
      this.cookieService.set('mailing summary', 'Master Database');
    }
    else if(report.name === 'Member Summary'){
      this.cookieService.set("mailing summary", '', new Date("Thu, 01 Jan 1970 00:00:01 GMT"));
      this.cookieService.set('member summary', 'Monthly Summary');
    }
    else{
      this.cookieService.set("member summary", '', new Date("Thu, 01 Jan 1970 00:00:01 GMT"));
      this.cookieService.set("mailing summary", '', new Date("Thu, 01 Jan 1970 00:00:01 GMT"));
    }
    
    this.selectedReport = report;
    this.router.navigate(['/reportDashboard']);  
  }

}
