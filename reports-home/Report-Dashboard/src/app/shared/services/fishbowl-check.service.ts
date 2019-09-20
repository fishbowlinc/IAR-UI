
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {AuthService} from './auth-service';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class FishbowlCheckService implements CanActivate {
    constructor(private _authService: AuthService ) {}

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        
        if(this._authService.isfishbowlCookieExist()){
            return this._authService.isfishbowlCookieExist();
        }
        else{
            window.location.href ='http://ir2qa.fishbowl.com:8880/logout';
        }
        
        //return true;
        // navigate to login page
        // this._router.navigate(['/login']);
        // you can save redirect url so after authing we can move them back to the page they requested
        // return false;
    }
}