import {  Component, OnInit  } from '@angular/core';
import { Router } from '@angular/router'
import { Report } from '../../models/reports';
import { DataService } from 'src/app/shared/services/data-service.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  public report;

  constructor(private router:Router  , private dataService : DataService) {
    this.report = dataService.getOption();
   }

  ngOnInit() {
      var frameDiv = document.getElementById('fm');
      if(this.report.dashboardId){ 
        var ifrm = document.createElement("iframe");
        ifrm.setAttribute("src"," http://10.200.10.21:8081/app/main#/dashboards/"+this.report.dashboardId+"?embed=true");
        ifrm.style.width = "100%";
        ifrm.style.height = "100%";
        ifrm.style.paddingLeft = "4%";
        ifrm.scrolling = "auto";
        ifrm.frameBorder = "0";
        ifrm.onload = load;

        frameDiv.appendChild(ifrm);
      }
      else{
        this.router.navigate(['/reportList']);  
      }
      function load(){
        document.getElementById("fbTheme-loader").style.display = "none";
      } 
  }

}
