import { Component, OnInit, OnDestroy } from "@angular/core";
import { AppConstants } from "../../../app.constants";
import { Subscription } from "rxjs";
import { Router } from "@angular/router";
import { DataService } from "src/app/shared/services/data-service.service";
import { CookieService } from "ngx-cookie-service";
import { AuthService } from "../../services/auth-service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit, OnDestroy {
  logoutText: string = AppConstants.LOGOUT_TEXT;
  logoutSubscription: Subscription;

  constructor(
    private _authService: AuthService,
    private dataService: DataService,
    private router: Router,
    private cookieService: CookieService
  ) { }

  ngOnInit() { }

  logoutUser() {
    //this.cookieService.deleteAll();
    // to delete the cookies
    /*if (this.cookieService.get('_irecube')) {
      this.cookieService.set(
        "_irecube",
        "",
        new Date("Thu, 01 Jan 1970 00:00:01 GMT"),
        "/"
      );
    }
    else if (this.cookieService.get('_irqaecube')) {
      this.cookieService.set(
        "_irqaecube",
        "",
        new Date("Thu, 01 Jan 1970 00:00:01 GMT"),
        "/"
      );
    }

    if (this._authService.isfishbowlCookieExist()) {
      if (location.host.indexOf("qa") > -1) {
        const fishbowlQA = this.cookieService.get("FishbowlQA");
        const qaASPXFORMSAUTH = this.cookieService.get("QA.ASPXFORMSAUTH");
        if (
          fishbowlQA != null &&
          fishbowlQA.trim().length > 0 &&
          qaASPXFORMSAUTH != null &&
          qaASPXFORMSAUTH.trim().length > 0
        ) {
          this.cookieService.set(
            "FishbowlQA",
            "",
            new Date("Thu, 01 Jan 1970 00:00:01 GMT"),
            "/",
            ".fishbowl.com",
            true
          );
          this.cookieService.set(
            "QA.ASPXFORMSAUTH",
            "",
            new Date("Thu, 01 Jan 1970 00:00:01 GMT"),
            "/",
            ".fishbowl.com",
            true
          );
        }
      } else if (location.host.indexOf("staging") > -1) {
        const fishbowlStaging = this.cookieService.get("FishbowlStaging");
        const stagingASPXFORMSAUTH = this.cookieService.get(
          "STAGING.ASPXFORMSAUTH"
        );
        if (
          fishbowlStaging != null &&
          fishbowlStaging.trim().length > 0 &&
          stagingASPXFORMSAUTH != null &&
          stagingASPXFORMSAUTH.trim().length > 0
        ) {
          this.cookieService.set(
            "FishbowlStaging",
            "",
            new Date("Thu, 01 Jan 1970 00:00:01 GMT"),
            "/",
            ".fishbowl.com",
            true
          );
          this.cookieService.set(
            "STAGING.ASPXFORMSAUTH",
            "",
            new Date("Thu, 01 Jan 1970 00:00:01 GMT"),
            "/",
            ".fishbowl.com",
            true
          );
        }
      } else {
        const fishbowl = this.cookieService.get("Fishbowl");
        const ASPXFORMSAUTH = this.cookieService.get("ASPXFORMSAUTH");
        if (
          fishbowl != null &&
          fishbowl.trim().length > 0 &&
          ASPXFORMSAUTH != null &&
          ASPXFORMSAUTH.trim().length > 0
        ) {
          this.cookieService.set(
            "Fishbowl",
            "",
            new Date("Thu, 01 Jan 1970 00:00:01 GMT"),
            "/",
            ".fishbowl.com",
            true
          );
          this.cookieService.set(
            "ASPXFORMSAUTH",
            "",
            new Date("Thu, 01 Jan 1970 00:00:01 GMT"),
            "/",
            ".fishbowl.com",
            true
          );
        }
      }
    }
    if (this._authService.isSisenseCookieExist()) {
      if (this.cookieService.get('_irsessionid')) {
        this.cookieService.set(
          "_irsessionid",
          "",
          new Date("Thu, 01 Jan 1970 00:00:01 GMT"),
          "/"
        );
      }
      else if (this.cookieService.get('_irqasessionid')) {
        this.cookieService.set(
          "_irqasessionid",
          "",
          new Date("Thu, 01 Jan 1970 00:00:01 GMT"),
          "/"
        );
      }

    }*/
    this.dataService.currentSession.source.subscribe(translatedValue => {
      if (translatedValue == "True") {
        //location.href.indexOf('reportDashboard') > -1){
        if (
          location.href.indexOf("qa") > -1 ||
          location.href.indexOf("localhost") > -1
        ) {
          window.location.href =
            "https://ir2qa.fishbowl.com/iar/sso/logout-redirect";
        }
        else {
          window.location.href =
            "https://ir.fishbowl.com/iar/sso/logout-redirect";
        }

      } else if (
        location.href.indexOf("qa") > -1 ||
        location.href.indexOf("localhost") > -1
      ) {
        window.location.href = "https://ir2qa.fishbowl.com/iar/sso/logout-handler";//"https://loginqa.fishbowl.com/Public/Login.aspx";
      } else {
        window.location.href = "https://ir.fishbowl.com/iar/sso/logout-handler";//"https://login.fishbowl.com/Public/Login.aspx";
      }
    });
  }

  ngOnDestroy() { }
}
