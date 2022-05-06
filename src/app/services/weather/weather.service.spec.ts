import { TestBed } from '@angular/core/testing';
import { WeatherService } from './weather.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { IWeatherData } from 'src/app/interfaces';


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
  });

  it('should be created WeatherService', () => {
    expect(service).toBeTruthy();
  });

  describe('GetCurrentWeatherData method', () => {

    const url: string = 'https://api.openweathermap.org/data/2.5/weather?q=london&units=metric';

    it('it should call GET method', () => {
      service.getCurrentWeatherData('london', 'metric').subscribe();
      const req = httpService.expectOne(url);

      req.flush(
        {
          main: { temp: 14.23, 'humidity': 72 },
          name: 'London',
          weather: [{ id: 804, main: 'Clouds', description: 'overcast clouds', icon: '04n' }],
          pop: 0.23
        }
      );
      expect(req.request.method).toBe('GET');
      httpService.verify();
    });

    it('it should return correct data', () => {
      service.getCurrentWeatherData('london', 'metric').subscribe((data: IWeatherData) =>
        expect(data).toEqual(
          {
            name: 'London',
            icon: '04n',
            humidity: 72,
            temp: 14.23,
            pop: 0
          }
        )
      );
      const req = httpService.expectOne(url);
      req.flush(
        {
          main: { temp: 14.23, 'humidity': 72 },
          name: 'London',
          weather: [{ id: 804, main: 'Clouds', description: 'overcast clouds', icon: '04n' }]
        }
      );

      expect(req.request.method).toBe('GET');
      httpService.verify();
    });

    it('it should return empty(error handler) obj', () => {
      service.getCurrentWeatherData('london', 'metric').subscribe((data: IWeatherData) =>
        expect(data).toEqual({ name: 'london', icon: '', humidity: 0, pop: 0, temp: 0 })
      );

      const req = httpService.expectOne(url);
      // Method is returning error - Should run catchError operator and handle the error
      req.flush({
        type: 'ERROR',
        status: 404
      });

      httpService.verify();
    });
  });
});
