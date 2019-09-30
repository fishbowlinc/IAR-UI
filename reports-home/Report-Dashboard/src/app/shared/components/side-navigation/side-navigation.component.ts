import { Component,  OnInit } from '@angular/core';
import { SideNavigationService } from '../../services/side-navigation.service';
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-side-navigation',
  templateUrl: './side-navigation.component.html',
  styleUrls: ['./side-navigation.component.css']
})
export class SideNavigationComponent implements OnInit {
  sideNavHTML: any;
  siteID : string;
  bid: string;

  constructor(private sideNavigationService: SideNavigationService, private route:ActivatedRoute,  private  router: Router ) { }

  ngOnInit() {
    this.route.queryParamMap.subscribe(params => {
      this.siteID = params.get('SiteId');
      this.bid = params.get('bid');
      if(this.siteID && this.bid){
        this.getSideNavigation(this.siteID , this.bid);
      }
      
    });
    
  }

  getSideNavigation(siteId: string , bid: string) {
    this.sideNavigationService.getSideNavigationHTML(siteId , bid)
    .subscribe(
      (response: any) => {
        if (!!response && !!response.body) {
          this.sideNavHTML = response.body.replace(new RegExp(('href="#"'.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")), 'g'), '')
        }
      },
      (error) => console.log(error)
      );
  }
  

}
