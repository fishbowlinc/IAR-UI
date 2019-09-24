import { Component,  OnInit } from '@angular/core';
import { SideNavigationService } from '../../services/side-navigation.service';
//import { SideNavigationService } from '../../services/side-navigation.service';

@Component({
  selector: 'app-side-navigation',
  templateUrl: './side-navigation.component.html',
  styleUrls: ['./side-navigation.component.css']
})
export class SideNavigationComponent implements OnInit {
  sideNavHTML: any;

  constructor(private sideNavigationService: SideNavigationService ) { }

  ngOnInit() {
    //siteID hardcoded for the time being
      this.getSideNavigation('452');
  }

  getSideNavigation(siteId: string) {
    this.sideNavigationService.getSideNavigationHTML(siteId)
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
