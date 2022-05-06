import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { AppComponent } from './app.component';
import { IWeatherData } from './interfaces';
import { WeatherService } from './services/weather/weather.service';

const mockTestWeatherData: IWeatherData = {
  lat: 23,
  lon: 23,
  timezone: 'test',
  timezone_offset: 23,
  current: { 
    dt: 23,
    sunrise: 23,
    sunset: 23,
    temp: 23,
    feels_like: 23,
    pressure: 23,
    humidity: 23,
    dew_point: 23,
    uvi: 23,
    clouds: 23,
    visibility: 23,
    wind_speed: 23,
    wind_deg: 23,
    weather: [
      {
        id: 23,
        main: 'test',
        description: 'test',
        icon: 'test'
      }
    ]
  },
  daily: [
    {
      dt: 23,
      sunrise: 23,
      sunset: 23,
      moonrise: 23,
      moonset: 23,
      moon_phase: 23,
      temp: {
        day: 23,
        min: 23,
        max: 23,
        night: 23,
        eve: 23,
        morn: 23
      },
      feels_like: {
        day: 23,
        night: 23,
        eve: 23,
        morn: 23
      },
      pressure: 23,
      humidity: 23,
      dew_point: 23,
      wind_speed: 23,
      wind_deg: 23,
      weather: [],
      clouds: 23,
      pop: 23
    }
  ]
};

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let weatherServiceMock: any;

  beforeEach(() => {
    weatherServiceMock = jasmine.createSpyObj('WeatherService', ['getGeocodingInfo', 'getWeatherData']);

    TestBed.configureTestingModule({
      declarations: [AppComponent],
      providers: [{ provide: WeatherService, useValue: weatherServiceMock }],
      schemas: [NO_ERRORS_SCHEMA]
    });
    fixture = TestBed.createComponent(AppComponent);
  });

  it('should create the AppComponent', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  describe('loadWeatherData method', () => {
    it('(Error handle) should return correct data length', () => {
      weatherServiceMock.getGeocodingInfo.and.returnValue(of([]));
  
      fixture.detectChanges();
      expect(fixture.componentInstance.list.length).toBe(5);
    });
  
    it('(Error handle) should load correct weather data', () => {
      weatherServiceMock.getGeocodingInfo.and.returnValue(of([]));
  
      fixture.detectChanges();
      expect(fixture.componentInstance.list[0]).toEqual({ name: 'london', description: '', icon: '', humidity: 0, pop: 0, temp: 0 });
    });

    it('should load correct weather data', () => {
      weatherServiceMock.getGeocodingInfo.and.returnValue(of([{ name: 'London', local_names: { it: 'Londra' }, 'lat': 51.5073219, 'lon': -0.1276474, 'country': 'GB'}]));
      weatherServiceMock.getWeatherData.and.returnValue(of(mockTestWeatherData));
      
      fixture.detectChanges();
      expect(fixture.componentInstance.list[0]).toEqual({ name: 'london', description: 'test', icon: 'test', humidity: 23, pop: 23, temp: 23 });
    });

    it('should set weather PoP to 0', () => {
      weatherServiceMock.getGeocodingInfo.and.returnValue(of([{ name: 'London', local_names: { it: 'Londra' }, 'lat': 51.5073219, 'lon': -0.1276474, 'country': 'GB'}]));
      weatherServiceMock.getWeatherData.and.returnValue(of({...mockTestWeatherData, daily: undefined}));
      
      fixture.detectChanges();
      expect(fixture.componentInstance.list[0].pop).toBe(0);
    });
  });    
});
