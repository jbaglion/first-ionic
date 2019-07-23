import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AppConfig } from '@app/configs/app.config';
import { AuthenticationService } from '../authentication.service';
import { CommonService } from '@app/services/common.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService,
        private commonService: CommonService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const currentUser = this.authenticationService.currentUserValue;
        if (currentUser && !this.authenticationService.isTokenExpired(currentUser.token)) {
            // logged in so return true
            return true;
        }
        this.commonService.showSnackBarFatal('Sesion Finalizada.');
        setTimeout(() => {
          window.location.href = AppConfig.endpoints.oldExranet + 'Login?logout=true';
          return false;
        },
        3000);
    }
}
