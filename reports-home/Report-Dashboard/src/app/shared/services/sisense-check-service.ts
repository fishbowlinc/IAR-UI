import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from "@angular/router";
import { AuthService } from "./auth-service";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable()
export class SisenseCheckService implements CanActivate {
  constructor(private _authService: AuthService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (this._authService.isSisenseCookieExist()) {
      return this._authService.isSisenseCookieExist();
    } else {
      if (
        location.href.indexOf("qa") > -1 ||
        location.href.indexOf("localhost") > -1
      ) {
        window.location.href = "https://loginqa.fishbowl.com/Public/Login.aspx";
      } else {
        window.location.href = "https://login.fishbowl.com/Public/Login.aspx";
      }
    }

    // navigate to login page
    // this._router.navigate(['/login']);
    // you can save redirect url so after authing we can move them back to the page they requested
    // return false;
  }
}
