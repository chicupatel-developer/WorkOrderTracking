import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';
import { LocalDataService } from '../services/local-data.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {


    constructor(public router: Router, public userService: UserService, public localDataService: LocalDataService) {
    }
    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): boolean {
        if (localStorage.getItem('token') != null)
        {
            console.log('inside,,, auth-guard.ts file');
            
            console.log(next);
            var reqUrl = next.pathFromRoot
                .map(v => v.url.map(segment => segment.toString()).join('/'))
                .join('/');
            console.log(reqUrl);

            if (localStorage.getItem('myRole') != null && localStorage.getItem('myRole') == 'Operator') {
                if (this.localDataService.authGuard403_Intercept_To_PreventDisplayOfHtmlPage_Of_Component_Admin(reqUrl))
                    return true;
                else {
                    console.log('Un-Authorized !');
                    this.router.navigate(['/home']);
                    return false;
                }
            }
            else
                return true;
        }            
        else {
            this.router.navigate(['/signin']);
            return false;
        }

    }
}
