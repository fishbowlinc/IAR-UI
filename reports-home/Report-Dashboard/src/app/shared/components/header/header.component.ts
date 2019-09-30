import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppConstants } from '../../../app.constants';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router'
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  logoutText: string = AppConstants.LOGOUT_TEXT;
  logoutSubscription: Subscription;

  constructor( private router:Router , private cookieService :CookieService) {}

  ngOnInit() {
  }

  logoutUser() {
    this.cookieService.deleteAll();
    window.location.href ='http://loginqa.fishbowl.com/Public/Login.aspx';  
    
  }

  ngOnDestroy() {

  }

}
