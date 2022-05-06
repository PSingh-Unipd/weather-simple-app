import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { IWeatherData } from 'src/app/interfaces';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: HttpClient) { }

  public getCurrentWeatherData(city: string, units: string): Observable<IWeatherData> {
    const url: string = `${environment.api_url}data/2.5/weather?q=${city}&units=${units}`;

    return this.http.get<IWeatherData>(url).pipe(
      map((data: any) => {
        return {
          name: data.name,
          icon: data.weather[0].icon,
          humidity: data.main.humidity,
          temp: data.main.temp,
          pop: data.pop ? data.pop : 0 // Not available in free API version/current weather data!
        } as IWeatherData;
      }),
      catchError(error => {
        return of({ name: city, icon: '', humidity: 0, pop: 0, temp: 0 }) as Observable<IWeatherData>;
      })
    )
  }
}
