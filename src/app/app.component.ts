import { Component, OnInit } from '@angular/core';
import { IGeoCodingData, IWeatherData } from './interfaces';
import { WeatherService } from './services/weather/weather.service';
import { catchError, EMPTY, forkJoin, map, merge, mergeMap, Observable, of, throwError, zip } from 'rxjs';
import { IWeatherCardData } from './interfaces/weather/weather-card-data.interface';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [WeatherService]
})
export class AppComponent implements OnInit {
  public list$!: Observable<IWeatherCardData[]>;

  constructor(private service: WeatherService) { }

  ngOnInit(): void {
    // this.list$ = forkJoin(['London', 'Paris', 'New York', 'Los Angeles','Tokyo'].map((city: string) =>
    //   this.service.getCurrentWeatherData(city, 'metric').pipe(
    //     mergeMap((data: IWeatherData) => {
    //       if (data.coord) {
    //         return this.service.getProbabilitOfPrecipitationForToday(data.coord).pipe(map(el => ({...data, pop: el}) as IWeatherData));
    //       }
    //       return of(data);
    //     })
    //   )
    // ));


    this.list$ = zip(['Longfdgfdgdon', 'Paris', 'New York', 'Los Angeles', 'Tokyo'].map((city: string) =>
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
          return of({ name: 'london', description: '',  icon: '', humidity: 0, pop: 0, temp: 0 })
        })
      )
    ));
  }
}