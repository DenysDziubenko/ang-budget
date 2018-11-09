import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {catchError, tap} from 'rxjs/operators';
import {_throw} from 'rxjs/observable/throw';
import {Injectable} from '@angular/core';
import {ServiceHelper} from './service-helper';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {

  constructor(private sh: ServiceHelper) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.sh.getSpinnerOccursChangeEmitter().next(true);
    const token =  localStorage.getItem('token') || '';
    const customReq = req.clone({
      headers: req.headers.set('Content-Type', 'application/json').set('token',`${token}`)
    });

    return next.handle(customReq).pipe(
      tap((event: HttpEvent<any>) => {
        if(event instanceof HttpResponse){
          this.sh.getSpinnerOccursChangeEmitter().next(false);
          if(event.body.token){
            const {token, user} = event.body;
            localStorage.setItem('token', token);
            localStorage.setItem('userName', user.firstName);
          }
        }
      }),
      catchError((response: HttpEvent<any>) => {
        this.sh.getSpinnerOccursChangeEmitter().next(false);
        this.sh.getErrorOccursChangeEmitter().next(response);
        return _throw(response);
      }));
  }
}
