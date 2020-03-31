import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

@Injectable()
export class SideNavigationService {

  constructor(private httpClient: HttpClient) { }

  getSideNavigationHTML(siteId, bid) {
    // return this.httpClient.get("../../../../assets/side-navigation.html", {observe: 'body', responseType: 'text'});
    // Add API call to fetch HTML later
    if (
      location.href.indexOf("qa") > -1 ||
      location.href.indexOf("localhost") > -1
    ) {
      return this.httpClient.get('https://loginqa.fishbowl.com/SSO/Menu/BySite/', {
        params: { SiteId: siteId, bid: bid }, withCredentials: true, observe: 'response', responseType: 'text'
      });
    } else {
      return this.httpClient.get('https://login.fishbowl.com/SSO/Menu/BySite/', {
        params: { SiteId: siteId, bid: bid }, withCredentials: true, observe: 'response', responseType: 'text'
      });
    }

  }
}


