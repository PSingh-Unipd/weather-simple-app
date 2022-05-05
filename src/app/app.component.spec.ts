import { HttpClientModule } from '@angular/common/http';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { WeatherService } from './services/weather/weather.service';

describe('AppComponent', () => {

  beforeEach(async () => {
    const eventServiceSpyObj = jasmine.createSpyObj('WeatherService', ['getCurrentWeatherData'])
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [
        HttpClientModule
      ],
      providers: [ { provide: WeatherService, useValue: eventServiceSpyObj } ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
