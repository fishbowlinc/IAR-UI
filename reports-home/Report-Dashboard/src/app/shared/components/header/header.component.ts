import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppConstants } from '../../../app.constants';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router'
import { CookieService } from 'ngx-cookie-service';
import {AuthService} from '../../services/auth-service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  logoutText: string = AppConstants.LOGOUT_TEXT;
  logoutSubscription: Subscription;

  constructor(private _authService:AuthService ,  private router:Router , private cookieService :CookieService) {}

  ngOnInit() {
  }

  logoutUser() {
    //this.cookieService.deleteAll();
    // to delete the cookies 
    if(this._authService.isfishbowlCookieExist()){

      if (location.host.indexOf('qa') > -1) {
        const fishbowlQA = this.cookieService.get('FishbowlQA') ;
        const qaASPXFORMSAUTH = this.cookieService.get('QA.ASPXFORMSAUTH') ;
        if ( fishbowlQA != null && fishbowlQA.trim().length > 0&&
            qaASPXFORMSAUTH != null && qaASPXFORMSAUTH.trim().length > 0) {
              this.cookieService.set("FishbowlQA", '', new Date("Thu, 01 Jan 1970 00:00:01 GMT"), '/' , '.fishbowl.com');
              this.cookieService.set("QA.ASPXFORMSAUTH", '', new Date("Thu, 01 Jan 1970 00:00:01 GMT"), '/' , '.fishbowl.com');
        }
      } else if (location.host.indexOf('staging') > -1) {
          const fishbowlStaging = this.cookieService.get('FishbowlStaging') ;
          const stagingASPXFORMSAUTH = this.cookieService.get('STAGING.ASPXFORMSAUTH') ;
          if ( fishbowlStaging != null && fishbowlStaging.trim().length > 0&&
              stagingASPXFORMSAUTH != null && stagingASPXFORMSAUTH.trim().length > 0) {
                this.cookieService.set("FishbowlStaging", '', new Date("Thu, 01 Jan 1970 00:00:01 GMT"), '/' , '.fishbowl.com');
                this.cookieService.set("STAGING.ASPXFORMSAUTH", '', new Date("Thu, 01 Jan 1970 00:00:01 GMT"), '/' , '.fishbowl.com');
          }
      } else {
          const fishbowl = this.cookieService.get('Fishbowl') ;
          const ASPXFORMSAUTH = this.cookieService.get('ASPXFORMSAUTH') ;
          if ( fishbowl != null && fishbowl.trim().length > 0 &&
              ASPXFORMSAUTH != null && ASPXFORMSAUTH.trim().length > 0) {
                this.cookieService.set("Fishbowl", '', new Date("Thu, 01 Jan 1970 00:00:01 GMT"), '/' , '.fishbowl.com');
                this.cookieService.set("ASPXFORMSAUTH", '', new Date("Thu, 01 Jan 1970 00:00:01 GMT"), '/' , '.fishbowl.com');
          }
      }
      
    }
    if(this._authService.isSisenseCookieExist()){
      this.cookieService.set("IR_SessionId", '', new Date("Thu, 01 Jan 1970 00:00:01 GMT"), '/' , '.ir2qa.fishbowl.com');
    }
    if(location.href.indexOf('reportDashboard') > -1){
      window.location.href = 'http://ir2qa.fishbowl.com:8880/logout';
    }
    else{
      window.location.href ='http://loginqa.fishbowl.com/Public/Login.aspx';  
    }
    
    
  }

  ngOnDestroy() {

  }

}
