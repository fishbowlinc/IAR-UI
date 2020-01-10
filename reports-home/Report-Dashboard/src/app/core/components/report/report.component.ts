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
        this.dataService.toggleSession("True")
      //var brandList = getBrandListCookie(this.cookieService);
      //var brandFilter = constructBrandDetails(brandList , this.report);
      var frameDiv = document.getElementById('fm');
      if(this.report.dashboardId){ 
        var ifrm = document.createElement("iframe");
        //ifrm.setAttribute("src"," http://10.200.10.21:8081/app/main#/dashboards/"+this.report.dashboardId+"?embed=true&h=false&l=false&t=false&filter="+ brandFilter);
        ifrm.setAttribute("src"," https://sisense.fishbowl.com/app/main#/dashboards/"+this.report.dashboardId+"?embed=true&h=false&l=false&t=false");
        ifrm.style.width = "100%";
        ifrm.style.height = "100%";
        ifrm.style.paddingLeft = "52px";
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
      function constructBrandDetails(brandList , selectedReport){
        var memberSummaryFilter = [
          {
            "instanceid": "EA307-F25C-F8",
            "isCascading": true,
            "disabled": false,
            "levels": [
              {
                "table": "Client",
                "column": "ClientName",
                "dim": "[Client.ClientName]",
                "datatype": "text",
                "merged": true,
                "title": "Client",
                "collapsed": true,
                "panel": "scope",
                "datasource": {
                  "title": "Monthly Summary",
                  "fullname": "LocalHost/Monthly Summary",
                  "id": "aLOCALHOST_aMONTHLYIAAaSUMMARY",
                  "address": "LocalHost",
                  "database": "aMonthlyIAAaSummary",
                  "lastBuildTime": "2019-09-11T13:46:00"
                },
                "filter": {
                  "explicit": true,
                  "multiSelection": false,
                  "userMultiSelect": false,
                  "members": []
                },
                "$$hashKey": "object:4581"
              },
              {
                "table": "Brand",
                "column": "BrandName",
                "dim": "[Brand.BrandName]",
                "datatype": "text",
                "merged": true,
                "title": "Brands to Include",
                "collapsed": true,
                "datasource": {
                  "title": "Monthly Summary",
                  "fullname": "LocalHost/Monthly Summary",
                  "id": "aLOCALHOST_aMONTHLYIAAaSUMMARY",
                  "address": "LocalHost",
                  "database": "aMonthlyIAAaSummary",
                  "lastBuildTime": "2019-09-11T13:46:00"
                },
                "filter": {
                  "explicit": false,
                  "multiSelection": true,
                  "members": []
                },
                "$$hashKey": "object:4582"
              }
            ],
            "model": {
              "instanceid": "49D91-DE14-6F",
              "__store": [
                "[Client.ClientName]",
                "[Brand.BrandName]"
              ],
              "$$events": {}
            },
            "$$events": {},
            "$filter": {},
            "$$guid": "C0AF4-EF12-D63D-BCD9",
            "$$hashKey": "object:4560"
          },
          {
            "jaql": {
              "table": "All Dates",
              "column": "Date",
              "dim": "[All Dates.Date (Calendar)]",
              "datatype": "datetime",
              "merged": true,
              "title": "Years in Date",
              "level": "years",
              "collapsed": true,
              "datasource": {
                "title": "Monthly Summary",
                "fullname": "LocalHost/Monthly Summary",
                "id": "aLOCALHOST_aMONTHLYIAAaSUMMARY",
                "address": "LocalHost",
                "database": "aMonthlyIAAaSummary",
                "lastBuildTime": "2019-09-25T08:27:00"
              },
              "filter": {
                "explicit": true,
                "multiSelection": true,
                "members": [
                  "2019-01-01T00:00:00"
                ]
              }
            },
            "instanceid": "A9CBD-2FFF-22",
            "isCascading": false,
            "disabled": false,
            "$$events": {},
            "$filter": {},
            "$$guid": "ED0E2-7A02-052E-BCE9",
            "$$hashKey": "object:4561"
          }
        ];
        var mailingSummaryFilter = [
          {
            "isCascading": true,
            "instanceid": "D6CBF-0F18-6C",
            "disabled": false,
            "levels": [
              {
                "column": "Created Date",
                "table": "Dim_Calendar",
                "dim": "[Dim_Calendar.Created Date (Calendar)]",
                "datatype": "datetime",
                "title": "Years in Created Date",
                "collapsed": true,
                "level": "years",
                "datasource": {
                  "title": "Master Database",
                  "fullname": "LocalHost/Master Database",
                  "id": "aLOCALHOST_aMASTERIAAaDATABASE",
                  "address": "LocalHost",
                  "database": "aMasterIAAaDatabase",
                  "lastBuildTime": "2019-08-30T17:57:00"
                },
                "panel": "scope",
                "filter": {
                  "explicit": true,
                  "multiSelection": true,
                  "members": [
                    "2019-08-01T00:00:00"
                  ],
                  "filter": {
                    "explicit": true,
                    "multiSelection": true,
                    "members": [
                      "2020-01-01T00:00:00",
                      "2019-01-01T00:00:00",
                      "2018-01-01T00:00:00",
                      "2017-01-01T00:00:00",
                      "2016-01-01T00:00:00"
                    ]
                  }
                },
                "$$hashKey": "object:6219"
              },
              {
                "table": "Dim_Calendar",
                "column": "Created Date",
                "dim": "[Dim_Calendar.Created Date (Calendar)]",
                "datatype": "datetime",
                "merged": true,
                "title": "Months in Created Date",
                "level": "months",
                "collapsed": true,
                "datasource": {
                  "title": "Master Database",
                  "fullname": "LocalHost/Master Database",
                  "id": "aLOCALHOST_aMASTERIAAaDATABASE",
                  "address": "LocalHost",
                  "database": "aMasterIAAaDatabase",
                  "lastBuildTime": "2019-08-30T17:57:00"
                },
                "panel": "scope",
                "filter": {
                  "explicit": false,
                  "multiSelection": true,
                  "all": true
                },
                "$$hashKey": "object:6220"
              }
            ],
            "model": {
              "instanceid": "65BE4-A40F-E2",
              "__store": [
                "[Dim_Calendar.Created Date (Calendar)]",
                "[Dim_Calendar.Created Date (Calendar)]"
              ],
              "$$events": {}
            },
            "$$events": {},
            "$filter": {},
            "$$guid": "226BF-BA22-CE9C-2CE8",
            "$$hashKey": "object:6186"
          },
          {
            "instanceid": "CE71C-7C1A-A7",
            "isCascading": true,
            "levels": [
              {
                "table": "Dim_Client",
                "column": "Client Name",
                "dim": "[Dim_Client.Client Name]",
                "datatype": "text",
                "merged": true,
                "title": "Client Name",
                "collapsed": true,
                "panel": "scope",
                "datasource": {
                  "title": "Master Database",
                  "fullname": "LocalHost/Master Database",
                  "id": "aLOCALHOST_aMASTERIAAaDATABASE",
                  "address": "LocalHost",
                  "database": "aMasterIAAaDatabase",
                  "lastBuildTime": "2019-08-30T17:57:00"
                },
                "filter": {
                  "explicit": true,
                  "multiSelection": false,
                  "userMultiSelect": false,
                  "members": []
                },
                "$$hashKey": "object:6266"
              },
              {
                "table": "Dim_Brand",
                "column": "Brand Name",
                "dim": "[Dim_Brand.Brand Name]",
                "datatype": "text",
                "merged": true,
                "title": "Brand Name",
                "collapsed": true,
                "datasource": {
                  "title": "Master Database",
                  "fullname": "LocalHost/Master Database",
                  "id": "aLOCALHOST_aMASTERIAAaDATABASE",
                  "address": "LocalHost",
                  "database": "aMasterIAAaDatabase",
                  "lastBuildTime": "2019-08-30T17:57:00"
                },
                "filter": {
                  "explicit": true,
                  "multiSelection": false,
                  "userMultiSelect": false,
                  "members": []
                },
                "$$hashKey": "object:6267"
              }
            ],
            "model": {
              "instanceid": "97E4A-2B7B-0C",
              "__store": [
                "[Dim_Client.Client Name]",
                "[Dim_Brand.Brand Name]"
              ],
              "$$events": {}
            },
            "disabled": false,
            "$$events": {},
            "$filter": {},
            "$$guid": "87A2F-8134-E158-4DDA",
            "$$hashKey": "object:6187"
          },
          {
            "jaql": {
              "table": "Agg_Message",
              "column": "Message Delivered Count",
              "dim": "[Agg_Message.Message Delivered Count]",
              "datatype": "numeric",
              "title": "Message Delivered Count",
              "datasource": {
                "title": "Master Database",
                "fullname": "LocalHost/Master Database",
                "id": "aLOCALHOST_aMASTERIAAaDATABASE",
                "address": "LocalHost",
                "database": "aMasterIAAaDatabase",
                "lastBuildTime": "2019-10-31T11:28:00"
              },
              "collapsed": false,
              "filter": {
                "from": "10"
              }
            },
            "instanceid": "C3ACF-C2B3-34",
            "isCascading": false,
            "$$events": {},
            "$filter": {},
            "$$guid": "B1E41-0A37-9D5A-A909",
            "$$hashKey": "object:6188"
          },
          {
            "jaql": {
              "table": "Agg_Message",
              "column": "Message Sent Date",
              "dim": "[Agg_Message.Message Sent Date (Calendar)]",
              "datatype": "datetime",
              "merged": true,
              "title": "Months in Message Sent Date",
              "level": "months",
              "filter": {
                "last": {
                  "count": 12,
                  "offset": 0
                },
                "custom": true
              },
              "datasource": {
                "title": "Master Database",
                "fullname": "LocalHost/Master Database",
                "id": "aLOCALHOST_aMASTERIAAaDATABASE",
                "address": "LocalHost",
                "database": "aMasterIAAaDatabase",
                "lastBuildTime": "2019-12-08T18:00:00"
              },
              "collapsed": true
            },
            "instanceid": "4977D-9230-79",
            "isCascading": false,
            "$$events": {},
            "$filter": {},
            "$$guid": "100BC-DBC2-3213-7C9A",
            "$$hashKey": "object:6189"
          }
        ];
        var brandFilter;
        brandList = JSON.parse(brandList);
        var brandinfoLength = brandList.length;
        if(brandinfoLength>0){
          if(selectedReport.name == "Member Summary"){
            brandFilter = memberSummaryFilter;
            brandFilter = JSON.parse(JSON.stringify(brandFilter));
            for(var j = 0 ; j < brandinfoLength ; j++ ){
              brandFilter[0].levels[0].filter.members.push(brandList[j].clientName);
              brandFilter[0].levels[1].filter.members.push(brandList[j].brandName);
            }
          }
          if(selectedReport.name == "Mailing Summary"){
            brandFilter = mailingSummaryFilter;
            brandFilter = JSON.parse(JSON.stringify(brandFilter));
            for(var j = 0 ; j < brandinfoLength ; j++ ){
              brandFilter[1].levels[0].filter.members.push(brandList[j].clientName);
              brandFilter[1].levels[1].filter.members.push(brandList[j].brandName);
            }
          }
          
        }
        return encodeURIComponent(JSON.stringify(brandFilter));
      }
  }

  

}
