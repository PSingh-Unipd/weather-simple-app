import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from 'src/environments/environment';

import { WeatherApiInterceptor } from './weather-api.interceptor';

describe('WeatherApiInterceptor', () => {

  let httpController: HttpTestingController;
  let httpClient: HttpClient;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        { provide: HTTP_INTERCEPTORS, useClass: WeatherApiInterceptor, multi: true }
      ]
    });
    httpController = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
  });

  describe('intercept method', () => {
    const url: string = 'https://api.openweathermap.org/data/2.5/weather?q=paris&units=metric';

    it('it should add API key', () => {
      httpClient.get(url).subscribe();    
      const req = httpController.expectOne(`${url}&appid=${environment.api_key}`);
      expect(req.request.params.get('appid')).not.toBe(null);
      httpController.verify();
    });

    it('it should not add API key', () => {
      httpClient.get('http://someotherapi.com').subscribe();
      const req = httpController.expectOne('http://someotherapi.com');
      expect(req.request.params.get('appid')).toBe(null);
      httpController.verify();
    });
  });
});