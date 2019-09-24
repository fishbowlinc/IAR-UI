import { Injectable } from '@angular/core';
import { HttpClient ,  HttpErrorResponse, HttpHeaders  } from '@angular/common/http';

@Injectable()
export class SideNavigationService {

  constructor(private httpClient: HttpClient) { }

  getSideNavigationHTML(siteId) {
    // return this.httpClient.get("../../../../assets/side-navigation.html", {observe: 'body', responseType: 'text'});
    // Add API call to fetch HTML later
    return this.httpClient.get('https://loginqa.fishbowl.com/SSO/Menu/BySite/', {
      params: {SiteId: siteId, bid: '33'}, withCredentials : true , observe: 'response' ,  responseType: 'text'
    });
  }
}


