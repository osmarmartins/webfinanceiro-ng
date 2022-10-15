import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {


  constructor(
    private authService: AuthService
  ) {}

  intercept(
    request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
      const jwt = this.authService.getToken();
      const url = request.url;

      if (jwt && !url.endsWith('/oauth/token')) {
        request = request.clone({
          setHeaders: { Authorization: `Bearer ${jwt}`, 'Content-Type': 'application/json'},
        });
      } else {
        request = request.clone({
          setHeaders: { Authorization: 'Basic YXBpOmZ1dHVyYTE5OTI=', 'Content-Type': 'application/x-www-form-urlencoded' },
        });
      }

      return next.handle(request);
    }
}
