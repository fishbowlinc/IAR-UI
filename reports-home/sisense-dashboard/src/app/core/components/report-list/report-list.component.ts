import {  Component, OnInit, OnDestroy  } from '@angular/core';
import { Router } from '@angular/router'
import { Report } from '../../models/reports';
import { REPORTLIST } from '../../models/mock-reports';
import { DataService } from 'src/app/shared/services/data-service.service';

@Component({
  selector: 'app-report-list',
  templateUrl: './report-list.component.html',
  styleUrls: ['./report-list.component.css']
})
export class ReportListComponent implements OnInit , OnDestroy {
  reportList = REPORTLIST;
  selectedReport: Report;
  constructor(private router:Router , private dataService:DataService) {

  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.dataService.setOption(this.selectedReport);
  }
  
  onSelect(report: Report): void {
    this.selectedReport = report;
    this.router.navigate(['/reportDashboard']);  
  }

}
