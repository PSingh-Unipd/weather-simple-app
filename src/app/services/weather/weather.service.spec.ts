import { TestBed } from '@angular/core/testing';
import { WeatherService } from './weather.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { IGeoCodingData } from 'src/app/interfaces';

describe('WeatherService', () => {
  let service: WeatherService;
  let httpService: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(WeatherService);
    httpService = TestBed.inject(HttpTestingController);
    httpService.verify();
  });

  it('should be created WeatherService', () => {
    expect(service).toBeTruthy();
  });

  describe('getGeocodingInfo method', () => {
    const responseMock: IGeoCodingData[] = [{ name: 'London', local_names: { it: 'Londra' }, 'lat': 51.5073219, 'lon': -0.1276474, 'country': 'GB' }];

    it('it should call GET method', () => {
      service.getGeocodingInfo('london', 1).subscribe();
      const req = httpService.expectOne('https://api.openweathermap.org/geo/1.0/direct?q=london&limit=1');

      req.flush(responseMock);
      expect(req.request.method).toBe('GET');
    });

    it('it should return correct data', () => {
      service.getGeocodingInfo('london', 1, 'england', 'gb').subscribe((data: IGeoCodingData[]) =>
        expect(data).toEqual(responseMock)
      );
      const req = httpService.expectOne('https://api.openweathermap.org/geo/1.0/direct?q=london&q=england&q=gb&limit=1');
      req.flush(responseMock);
    });
  });

  describe('getWeatherData method', () => {
    const responseMock2 = { name: 'London', temp: 20 };
    it('it should call GET method', () => {
      service.getWeatherData(1, 2, 'metrics').subscribe();
      const req = httpService.expectOne('https://api.openweathermap.org/data/2.5/onecall?lon=1&lat=2&units=metrics&exclude=minutely,hourly,alerts');

      req.flush(responseMock2);
      expect(req.request.method).toBe('GET');
    });
  });
});
