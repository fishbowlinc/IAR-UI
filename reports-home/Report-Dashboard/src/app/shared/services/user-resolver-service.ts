import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { UserService } from "./user-service";
import { Observable } from "rxjs";

@Injectable()
export class UserResolver implements Resolve<any> {

    constructor(private userService: UserService) {}
    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
      ): Observable<any>|Promise<any>|any {
            return this.userService.getUserDetails();
      }

}