import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, of, Observable } from 'rxjs';
import { delay } from 'q';
import { map, } from 'rxjs/operators';
@Injectable()
export class UserService {
    userName: string = null;
    isAdmin: boolean = false;
    userLoadCompleteSubject = new Subject<any>();
    // userLoadComplete$ = this.userLoadCompleteSubject.asObservable();
    constructor(private httpClient: HttpClient) { }
    getUserDetails() {
        if (this.userName !== null && this.userName.length > 0) {
            return new Promise(resolve => setTimeout(resolve, 100));
        } else {
            return this.httpClient.get('/pa/user/getUserDetails', { observe: 'body', responseType: 'json' })
                .pipe(
                    map((response: any) => {
                        if (!!response) {
                            this.userName = response.userName;
                            if (response.roleId.indexOf(1001) > -1) {
                                this.isAdmin = true;
                            } else {
                                this.isAdmin = false;
                            }
                        }
                        return response;
                    }
                    )
                );
            // return this.userLoadCompleteSubject;
        }
    }
    /*getUserNotifcations(isAllRequired: boolean) {
       return this.httpClient.get('/pa/user/getUserNotifications', { observe: 'body', responseType: 'json' })
                .pipe(
                    map((response: any) => {
                        if (!!response) {
                            if ( response['notificationsList'] != null
                                && response['notificationsList'].length
                                 ) {
                                     if (this.isAdmin === true) {
                                        response['blueNotificationListCount'] = 0;
                                        response['blueNotificationList'] = [];
                                        response['redNotificationsListCount'] = 0;
                                        response['redNotificationList'] = [];
                                        for (let i = 0 ; i < response['notificationsList'].length ; i++) {
                                           if (response['notificationsList'][i]['eventId'] === 1 ) {
                                                response['redNotificationsListCount']++;
                                                if (
                                                    (isAllRequired)
                                                    ||
                                                    (response['redNotificationList'].length < 4
                                                    && (response['redNotificationList'].length
                                                    + response['blueNotificationList'].length) < 5)
                                                )
                                                {
                                                    response['redNotificationList'].push(response['notificationsList'][i]);
                                                }
                                            } else {
                                                response['blueNotificationListCount'] ++;
                                                if (

                                                    (isAllRequired)
                                                    ||
                                                    (response['blueNotificationList'].length < 4
                                                    && (response['redNotificationList'].length
                                                    + response['blueNotificationList'].length) < 5)
                                                ) {
                                                    response['blueNotificationList'].push(response['notificationsList'][i]);
                                                }
                                            }
                                            // if (((response['blueNotificationList'].length +
                                            //     response['redNotificationList'].length) === 5) && isAllRequired === false)  {
                                            //     break;
                                            // }
                                        }
                                        if (isAllRequired === false) {
                                                        if (     (
                                                            (response['blueNotificationList'].length +
                                                            response['redNotificationList'].length) < 5
                                                        ) &&
                                                        (
                                                            (response['blueNotificationList'].length +
                                                            response['redNotificationList'].length) < response['notificationsList'].length
                                                        )
                                                    )
                                                {
                                                        if (response['blueNotificationList'].length === 4 ) {
                                                            response['blueNotificationList'].push(response['notificationsList'][4]);
                                                        } else if (response['redNotificationList'].length === 4) {
                                                            response['redNotificationList'].push(response['notificationsList'][4]);
                                                        }
                                                }
                                                response['blueNotificationListCount'] = response['blueNotificationList'].length === 0 ? 0 :
                                                                                         response['blueNotificationListCount']
                                                                                         - response['blueNotificationList'].length;
                                                response['redNotificationsListCount'] = response['redNotificationList'].length === 0 ? 0 :
                                                                                        response['redNotificationsListCount'] -
                                                                                        response['redNotificationList'].length;
                                        }
       
                                     } else {
                                        response['blueNotificationListCount'] = 0;
                                        response['blueNotificationList'] = [];
                                        response['greeNotificationListCount'] = 0;
                                        response['greeNotificationList'] = [];
                                        for (let i = 0 ; i < response['notificationsList'].length ; i++) {
                                            // if (((response['blueNotificationList'].length +
                                            // response['greeNotificationList'].length) === 5) && isAllRequired === false ) {
                                            //     break;
                                            // }
                                            if (response['notificationsList'][i]['eventId'] === 2 &&
                                            response['notificationsList'][i]['reportStage'] &&
                                            response['notificationsList'][i]['reportStage'] === 3) {
                                                response['greeNotificationListCount']++;
                                                if ( ( isAllRequired === true)
                                                        ||
                                                    (response['greeNotificationList'].length < 4 &&
                                                    (response['greeNotificationList'].length +
                                                    response['blueNotificationList'].length) < 5 )
                                                ) {
                                                    response['greeNotificationList'].push(response['notificationsList'][i]);
                                                } 
                                            } else {
                                                response['blueNotificationListCount']++;
                                                if (
                                                    ( isAllRequired === true)
                                                        ||
                                                    (response['blueNotificationList'].length < 4 &&
                                                    (response['greeNotificationList'].length +
                                                    response['blueNotificationList'].length) < 5 )
                                                ) {
                                                response['blueNotificationList'].push(response['notificationsList'][i]);
                                                 }
                                        }
                                        }
                                        if (isAllRequired === false) {
                                            if (
                                                (
                                                    (response['blueNotificationList'].length +
                                                    response['greeNotificationList'].length) < 5
                                                ) &&
                                               (
                                                    (response['blueNotificationList'].length +
                                                    response['greeNotificationList'].length) < response['notificationsList'].length
                                               )
                                              )
                                               {
                                                       if (response['blueNotificationList'].length === 4 ) {
                                                           response['blueNotificationList'].push(response['notificationsList'][4]);
                                                       } else if (response['greeNotificationList'].length === 4) {
                                                           response['greeNotificationList'].push(response['notificationsList'][4]);
                                                       }
                                               }
                                               response['blueNotificationListCount'] =  response['blueNotificationList'].length === 0 ?
                                                                                         0 : (response['blueNotificationListCount'] -
                                                                                          response['blueNotificationList'].length) ;
                                               response['greeNotificationListCount'] = response['greeNotificationList'].length === 0 ? 0 :
                                                                                         response['greeNotificationListCount'] -
                                                                                          response['greeNotificationList'].length;
                                        }
                                        }
                            }
                        }
                        return response;
                    }
                    )
                );
            // return this.userLoadCompleteSubject;
        
    }*/
}
