import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthService } from './shared/services/auth-service';
import { FishbowlCheckService } from './shared/services/fishbowl-check.service';
import { SisenseCheckService } from './shared/services/sisense-check-service';
import { ReportComponent } from './core/components/report/report.component';
import { ReportListComponent } from './core/components/report-list/report-list.component';

const routes: Routes = [
  { path: '', redirectTo: '/reportList', pathMatch: 'full', canActivate: [FishbowlCheckService, SisenseCheckService] },
  { path: 'reportList', component: ReportListComponent, canActivate: [FishbowlCheckService, SisenseCheckService] },
  { path: 'reportDashboard', component: ReportComponent, canActivate: [FishbowlCheckService, SisenseCheckService] }
];


/*const routes: Routes = [
  { path: '', redirectTo: '/reportList' , pathMatch: 'full'},
  { path: 'reportList', component: ReportListComponent },
  { path: 'reportDashboard', component: ReportComponent  }
];*/

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled', useHash: true })],
  exports: [RouterModule],
  providers: [AuthService, FishbowlCheckService, SisenseCheckService]
})
export class AppRoutingModule { }
