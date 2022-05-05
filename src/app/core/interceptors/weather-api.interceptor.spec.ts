import { TestBed } from '@angular/core/testing';

import { WeatherApiInterceptor } from './weather-api.interceptor';

describe('WeatherApiInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      WeatherApiInterceptor
    ]
  }));

  it('should be created WeatherApiInterceptor', () => {
    const interceptor: WeatherApiInterceptor = TestBed.inject(WeatherApiInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
