import { Injectable } from '@angular/core';
import { CanLoad, Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthorizationGuard implements CanLoad {

  constructor(private router: Router) { }

  canLoad(): boolean {
    if(window.localStorage.getItem('user_info')) return true;
    this.router.navigate(['login']);
    return false;
  }
  
}
