import {Injectable} from "@angular/core";
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {catchError, Observable, switchMap, throwError} from "rxjs";
import {TokenStorageService} from "./token-storage.service";
import {Router} from "@angular/router";
import {AuthenticationService} from "./authentication.service";


@Injectable()
export class JwtInterceptor implements HttpInterceptor
{

  constructor(private authService: AuthenticationService,     private token: TokenStorageService,
              private router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (request.url.includes('refreshToken')) {
      return next.handle(this.addToken(request));
    }
    return next.handle(this.addToken(request)).pipe(
      catchError(error => {
        if (error instanceof HttpErrorResponse && error.status === 401) {
          return this.handle401Error(request, next);
        } else {
          return throwError(error);
        }
      })
    );
  }

  private addToken(request: HttpRequest<any>): HttpRequest<any> {
    return request.clone({
      withCredentials: true,
    });
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
    return this.authService.refreshToken().pipe(
      switchMap((loginResponse) => {
        if (loginResponse) {
          this.token.saveUser(loginResponse);
          return next.handle(this.addToken(request));
        }
        this.router.navigate(['logout']);
        return throwError('Token refresh failed');
      }),
      catchError(error => {
        this.router.navigate(['logout']);
        return throwError(error);
      })
    );
  }

}

