import { Component, OnInit, OnDestroy, HostListener } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Report } from "../../models/reports";
import { REPORTLIST } from "../../models/mock-reports";
import { CookieService } from "ngx-cookie-service";
import { DataService } from "src/app/shared/services/data-service.service";
import { Observable } from "rxjs";
import { AuthService } from "../../../shared/services/auth-service";

@Component({
  selector: "app-report-list",
  templateUrl: "./report-list.component.html",
  styleUrls: ["./report-list.component.css"]
})
export class ReportListComponent implements OnInit, OnDestroy {
  reportList = REPORTLIST;
  selectedReport: Report;
  public report;
  constructor(
    private router: Router,
    private _authService: AuthService,
    private route: ActivatedRoute,
    private dataService: DataService,
    private cookieService: CookieService
  ) {
    this.report = dataService.getOption();
  }

  ngOnInit() {}

  ngOnDestroy() {
    if (this.selectedReport) {
      this.dataService.setOption(this.selectedReport);
    } else {
      this.dataService.setOption(this.report);
    }
  }
  @HostListener("window:beforeunload")
  canDeactivate(): Observable<void> | void {
    //if(location.href.indexOf('reportDashboard')== -1 || location.href.indexOf('reportList')==-1){
    // to delete the cookies
    if (this.cookieService.get("_irecube")) {
      this.cookieService.set(
        "_irecube",
        "",
        new Date("Thu, 01 Jan 1970 00:00:01 GMT"),
        "/",
        "ir2qa.fishbowl.com",
        true
      );
    }
    //if(this._authService.isSisenseCookieExist()){
    //this.cookieService.set("_irsession_id", '', new Date("Thu, 01 Jan 1970 00:00:01 GMT"), '/' , '.ir2qa.fishbowl.com');
    //}
    if (this.cookieService.check(".prism_shared")) {
      this.cookieService.set(
        ".prism_shared",
        "",
        new Date("Thu, 01 Jan 1970 00:00:01 GMT"),
        "/",
        "sisense.fishbowl.com",
        true
      );
    }
    //}
  }
  onSelect(report: Report): void {
    this.cookieService.set(
      "_irecube",
      "",
      new Date("Thu, 01 Jan 1970 00:00:01 GMT"),
      "/",
      "ir2qa.fishbowl.com",
      true
    );
    if (report.name === "Mailing Comparison") {
      this.cookieService.set("_irecube", window.btoa("Warehouse"));
    }
    if (report.name === "Member Summary") {
      this.cookieService.set("_irecube", window.btoa("Monthly Summary"));
    }
    if (report.name === "Mailing Summary") {
      this.cookieService.set("_irecube", window.btoa("Warehouse"));
    }

    this.selectedReport = report;
    this.router.navigate(["/reportDashboard"]);
  }
}
