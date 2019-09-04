import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppConstants } from '../../../app.constants';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  logoutText: string = AppConstants.LOGOUT_TEXT;
  logoutSubscription: Subscription;

  constructor( private router:Router) {}

  ngOnInit() {
  }

  logoutUser() {
    debugger;
    window.location.href ='http://ir2qa.fishbowl.com:8880/logout';  
  }

  ngOnDestroy() {

  }

}
