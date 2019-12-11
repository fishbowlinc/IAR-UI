import {  Component, OnInit  } from '@angular/core';
import { Router } from '@angular/router'
import { Report } from '../../models/reports';
import { DataService } from 'src/app/shared/services/data-service.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  public report;

  constructor(private router:Router  , private dataService : DataService , private cookieService: CookieService) {
    this.report = dataService.getOption();
   }

  ngOnInit() {
      var brandList = getBrandListCookie(this.cookieService);
      var brandFilter = constructBrandDetails(brandList);
      var frameDiv = document.getElementById('fm');
      if(this.report.dashboardId){ 
        var ifrm = document.createElement("iframe");
        ifrm.setAttribute("src"," http://10.200.10.21:8081/app/main#/dashboards/"+this.report.dashboardId+"?embed=true&h=false&l=false&t=false?filter="+ brandFilter);
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
      function getBrandListCookie(cookie){
        return window.atob(cookie.get("_irbrndlst"));
      }
      function constructBrandDetails(brandList){
        var brandFilter = [
          {
            "jaql": {
              "table": "Client",
              "column": "ClientName",
              "dim": "[Client.ClientName]",
              "datatype": "text",
              "merged": true,
              "title": "Client",
              "collapsed": true,
              "filter": {
                "members": [],
                "explicit": false,
                "multiSelection": true
              }
            }
          },
          {
            "jaql": {
              "table": "Brand",
              "column": "BrandName",
              "dim": "[Brand.BrandName]",
              "datatype": "text",
              "merged": true,
              "title": "Brand",
              "collapsed": true,
              "filter": {
                "members": [],
                "explicit": false,
                "multiSelection": true
              }
            }
          }
        ]
        brandList = JSON.parse(brandList);
        brandFilter = JSON.parse(JSON.stringify(brandFilter));
        var brandinfoLength = brandList.length;
        if(brandinfoLength>0){
          for(var j = 0 ; j < brandinfoLength ; j++ ){
            brandFilter[0].jaql.filter.members.push(brandList[j].brandName);
            brandFilter[1].jaql.filter.members.push(brandList[j].brandName);
          }
        }
        return window.btoa(JSON.stringify(brandFilter));
      }
  }

  

}
