import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const requiredRole = next.data['requiredRole']; // Access requiredRole using ['requiredRole']
    const userRole = this.authService.getUserRole();
    if (userRole === requiredRole) {
      return true;
    } else {
      // Redirect to unauthorized page or login page
      return this.router.parseUrl('/unauthorized');
    }
  }
}
