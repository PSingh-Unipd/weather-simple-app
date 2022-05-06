import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { AppComponent } from './app.component';
import { WeatherService } from './services/weather/weather.service';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let weatherServiceMock;
  beforeEach(async () => {
    weatherServiceMock = jasmine.createSpyObj('WeatherService', ['getCurrentWeatherData', 'getProbabilitOfPrecipitationForToday'])
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [
        HttpClientModule
      ],
      providers: [ { provide: WeatherService, useValue: weatherServiceMock } ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    weatherServiceMock.getCurrentWeatherData.and.returnValue(of({ name: 'unit test', icon: '', humidity: 0, pop: 0, temp: 0 }));
    fixture.detectChanges();
  });

  it('should create the AppComponent', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
