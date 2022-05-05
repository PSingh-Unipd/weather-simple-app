import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpParams
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class WeatherApiInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    // Adding access key if this request is to https://api.openweathermap.org/
    if (request.url.indexOf(environment.api_url) !== -1) {
      const cloneRequest = request.clone({
        params: new HttpParams().set('appid', environment.api_key)
      });
  
      return next.handle(cloneRequest);
    }
    return next.handle(request);
  }
}
