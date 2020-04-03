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
  public report: any;
  constructor(
    private router: Router,
    private _authService: AuthService,
    private route: ActivatedRoute,
    private dataService: DataService,
    private cookieService: CookieService
  ) {
    this.report = dataService.getOption();
  }

  ngOnInit() { }

  ngOnDestroy() {
    if (this.selectedReport) {
      this.dataService.setOption(this.selectedReport);
    } else {
      this.dataService.setOption(this.report);
    }
  }
  @HostListener("window:beforeunload")
  canDeactivate(): Observable<void> | void {
    if (this.cookieService.get("_irecube")) {
      this.cookieService.set(
        "_irecube",
        "",
        new Date("Thu, 01 Jan 1970 00:00:01 GMT"),
        "/",
        "ir2qa.fishbowl.com"
      );
    }
    if (this.cookieService.check(".prism_shared")) {
      this.cookieService.set(
        ".prism_shared",
        "",
        new Date("Thu, 01 Jan 1970 00:00:01 GMT"),
        "/",
        "sisense.fishbowl.com"
      );
    }
  }
  onSelect(report: Report): void {
    this.cookieService.set(
      "_irecube",
      "",
      new Date("Thu, 01 Jan 1970 00:00:01 GMT"),
      "/",
      "ir2qa.fishbowl.com"
    );
    var currentECube: string;
    if (report.name === "Mailing Comparison" || report.name === "Mailing Summary") {
      currentECube = "Warehouse";
    }
    if (report.name === "Member Summary") {
      currentECube = "Membership Warehouse";
    }
    if (currentECube) {
      var now = new Date();
      var threeHoursExpiryTime = now.setHours(now.getHours() + 3);
      var encrptedECube = window.btoa(currentECube);
      if (
        location.href.indexOf("qa") > -1) {
        this.cookieService.set("_irecube", encrptedECube, threeHoursExpiryTime, "/", ".ir2qa.fishbowl.com", true);
      }
      else if (location.href.indexOf("localhost") > -1) {
        this.cookieService.set("_irecube", encrptedECube, threeHoursExpiryTime, "/", "localhost");
      }
      else {
        this.cookieService.set("_irecube", encrptedECube, threeHoursExpiryTime, "/", ".ir.fishbowl.com", true);
      }
    }
    this.selectedReport = report;
    this.router.navigate(["/reportDashboard"]);
  }
}
