import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {

    if (this.authService.isAccessTokenInvalido()) {
      this.router.navigate(['login']);
    } else if (next.data.roles && !this.authService.temQualquerPermissao(next.data.roles) ) {
        this.router.navigate(['/access']);
    }

    return true;
  }
}
