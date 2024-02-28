import {Injectable} from "@angular/core";
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {Router} from "@angular/router";


@Injectable()
export class Interceptor implements HttpInterceptor
{

  constructor(private router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const modifiedRequest = request.clone({
      withCredentials: true
    });

    return next.handle(modifiedRequest).pipe(
      catchError((error: HttpErrorResponse) => {
   /*     if (error.status === 401) {
          this.router.navigate(['/logout']);
        }*/
        return throwError(error);
      })
    );
  }
}

