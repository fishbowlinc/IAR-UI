import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import {AuthService} from '../app/shared/services/auth-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Report-dashboard';
  constructor(private _authService:AuthService , private cookieService :CookieService) {
   
  }
  OnAppExit(){
    if(location.href.indexOf('reportDashboard')== -1 || location.href.indexOf('reportList')==-1){
        // to delete the cookies 
      if(this.cookieService.get('_irecube')){
        this.cookieService.set("_irecube", '', new Date("Thu, 01 Jan 1970 00:00:01 GMT"), '/' , 'ir2qa.fishbowl.com');
      }
      if(this._authService.isSisenseCookieExist()){
        this.cookieService.set("_irsession_id", '', new Date("Thu, 01 Jan 1970 00:00:01 GMT"), '/' , '.ir2qa.fishbowl.com');
      }
      if(this.cookieService.check('.prism_shared')){
        this.cookieService.set(".prism_shared", '', new Date("Thu, 01 Jan 1970 00:00:01 GMT"), '/' , 'sisense.fishbowl.com');
      }
    }
    
  }
}
