import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AlertifyService } from '../_services/alertify/Alertify.service';
import { AuthService } from '../_services/auth/AuthService.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private jwtHelper: JwtHelperService, private authService: AuthService, private router: Router,
    private alertify: AlertifyService) {}


  canActivate() {
    // tslint:disable-next-line: prefer-const
    let token = localStorage.getItem('token');
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      return true;
    }

    this.router.navigate(['login']);
    return false;
  }
  
  //   }
  // canActivate(next: ActivatedRouteSnapshot): boolean {
  //   const roles = next.firstChild.data['roles'] as Array<string>;
  //   if (roles) {
  //     const match = this.authService.roleMatch(roles);
  //     if (match) {
  //       return true;
  //     } else {
  //       this.router.navigate(['members']);
  //       this.alertify.error('You are not authorised to access this area');
  //     }
  //   }


  //   if (this.authService.loggedIn()) {
  //   return true;
  //   }

  //   this.alertify.error('You shall not pass!');
  //   this.router.navigate(['/home']);
  //   return false;
  // }
}
