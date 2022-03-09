import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { mergeMap, Observable, tap } from 'rxjs';
import { AuthService } from '@auth0/auth0-angular';
import { environment } from '../../../environments/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private token: string | undefined;
  constructor(private authService: AuthService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return this.authService.isAuthenticated$.pipe(
      mergeMap((isAusenticated) => {
        return isAusenticated
          ? this.addTokenToHeader(request, next)
          : next.handle(request);
      })
    );
  }

  private addTokenToHeader(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (this.token) {
      return this.add(request, next, this.token);
    } else {
      return this.getToken().pipe(
        tap((token) => {
          this.token = token;
        }),
        mergeMap((token) => this.add(request, next, token))
      );
    }
  }

  private add(
    request: HttpRequest<unknown>,
    next: HttpHandler,
    token: string
  ): Observable<HttpEvent<unknown>> {
    const requestWithToken = request.clone({
      setHeaders: { Authorization: `Bearer ${token}` },
    });
    return next.handle(requestWithToken);
  }

  private getToken(): Observable<string> {
    return this.authService.getAccessTokenWithPopup({
      audience: environment.auth.audience,
      scope: environment.auth.scope,
    });
  }
}
