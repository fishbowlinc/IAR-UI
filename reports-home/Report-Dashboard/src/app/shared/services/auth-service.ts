import { CookieService } from 'ngx-cookie-service';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {

    constructor(private cookieService: CookieService) { }

    isSisenseCookieExist() {
        const ir_SessionId = this.cookieService.get('_irsession_id');
        if (ir_SessionId != null && ir_SessionId.trim().length > 0) {
            return true;
        }
        return false;
    }

    isfishbowlCookieExist() {
        if (location.host.indexOf('qa') > -1) {
            const fishbowlQA = this.cookieService.get('FishbowlQA');
            const qaASPXFORMSAUTH = this.cookieService.get('QA.ASPXFORMSAUTH');
            if (fishbowlQA != null && fishbowlQA.trim().length > 0 &&
                qaASPXFORMSAUTH != null && qaASPXFORMSAUTH.trim().length > 0) {
                return true;
            }
        } else if (location.host.indexOf('staging') > -1) {
            const fishbowlStaging = this.cookieService.get('FishbowlStaging');
            const stagingASPXFORMSAUTH = this.cookieService.get('STAGING.ASPXFORMSAUTH');
            if (fishbowlStaging != null && fishbowlStaging.trim().length > 0 &&
                stagingASPXFORMSAUTH != null && stagingASPXFORMSAUTH.trim().length > 0) {
                return true;
            }
        } else {
            const fishbowl = this.cookieService.get('Fishbowl');
            const ASPXFORMSAUTH = this.cookieService.get('.ASPXFORMSAUTH');
            if (fishbowl != null && fishbowl.trim().length > 0 &&
                ASPXFORMSAUTH != null && ASPXFORMSAUTH.trim().length > 0) {
                return true;
            }
        }
        return true;
    }
}
