import {Injectable} from "@angular/core";
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {catchError, Observable, switchMap, throwError} from "rxjs";
import {TokenStorageService} from "./token-storage.service";
import {tap} from "rxjs/operators";
import {Router} from "@angular/router";
import {AuthenticationService} from "./authentication.service";
import {LoginResponse} from "../../../model/user/LoginResponse";
import {RefreshTokenRequest} from "../../../model/user/RefreshTokenRequest";
import {JsonResponse} from "../../../model/user/JsonResponse";

@Injectable()
export class JwtInterceptor implements HttpInterceptor
{
  refreshTokenRequest : RefreshTokenRequest = {};
  loginResponse : LoginResponse = {};
  constructor(private authService: AuthenticationService,     private token: TokenStorageService,
              private router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
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
    const accessToken = this.token.getAccessToken();
    if (accessToken) {
      return request.clone({
        setHeaders: {
          Authorization: `Bearer ${accessToken}`
        }
      });
    }
    return request;
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
    this.refreshTokenRequest.token = this.token.getToken()!;
    return this.authService.refreshToken(this.refreshTokenRequest).pipe(
      switchMap((loginResponse) => {
        // Assuming the refresh token endpoint returns both access token and refresh token
        if (loginResponse && loginResponse.accessToken) {
          this.token.saveAccesToken(loginResponse.accessToken);
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

