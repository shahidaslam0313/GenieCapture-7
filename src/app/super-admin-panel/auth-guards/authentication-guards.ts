import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
@Injectable()
  export class AuthenticationService {
    isLoggedIn(): boolean {
      let token= localStorage.getItem('xxx-yyy');
      if ( token!= null) {
        return true;
      }
      else {
        return false;
      }
    }
  }
  @Injectable()
  export class AlwaysAuthService implements CanActivate {
    constructor() { }
    canActivate() {
      return true;
    }
  }
  @Injectable()
  export class OnlyLoggedInUsersGuard implements CanActivate {
    constructor(private userService: AuthenticationService, private router: Router) { }
    canActivate() {
      if (this.userService.isLoggedIn()) {
        return true;
      }
      else {
        this.router.navigate(['/admin']);
      }
    }
  }
  @Injectable()
  export class OnlyLoggedOutUsersGuard implements CanActivate {
    constructor(private userService: AuthenticationService, private router: Router) { }
    canActivate() {
      if (!this.userService.isLoggedIn()) {
        return true;
      }
      else {
        this.router.navigate(['/']);
      }
    }
  }
  
