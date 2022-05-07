import { Component, OnDestroy, OnInit } from '@angular/core';
import { IGeoCodingData, IWeatherCardData, IWeatherData } from './interfaces';
import { WeatherService } from './services/weather/weather.service';
import { catchError, map, mergeMap, of, Subject, takeUntil, zip } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  public list: IWeatherCardData[] = [];
  destroy$ = new Subject<void>();

  constructor(private service: WeatherService) { }

  ngOnInit(): void {
    this.loadWeatherData();
  }

  loadWeatherData(): void {
    zip(['London', 'Paris', 'New York', 'Los Angeles', 'Tokyo'].map((city: string) =>
      this.service.getGeocodingInfo(city, 1).pipe(
        mergeMap((geo: IGeoCodingData[]) => {
          if (geo.length > 0) {
            return this.service.getWeatherData(geo[0].lon, geo[0].lat, 'metric').pipe(
              map((result: IWeatherData) => ({
                name: city,
                description: result.current?.weather[0].description,
                icon: result.current?.weather[0].icon,
                temp: result.current?.temp,
                humidity: result.current?.humidity,
                pop: result.daily ? result.daily[0].pop : 0
              } as IWeatherCardData))
            );
          }
          throw new Error('Invalid city name!');
        }),
        catchError(err => {
          // Using service like Bugsnag is possible to log and easily manage these errors
          return of({ name: 'London', description: '', icon: '', humidity: 0, pop: 0, temp: 0 })
        }),
        takeUntil(this.destroy$)
      )
    )).subscribe(result => this.list = result);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }
}