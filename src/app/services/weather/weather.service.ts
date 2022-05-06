import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IGeoCodingData, IWeatherData } from 'src/app/interfaces';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: HttpClient) { }

  getGeocodingInfo(city: string, limit: number, state_code?: string, country?: string): Observable<IGeoCodingData[]> {
    const url: string = `${environment.api_url}geo/1.0/direct`;
    let requestParams: HttpParams = new HttpParams();

    requestParams = requestParams.set('q', city);
    requestParams = requestParams.set('limit', limit);
    
    if (state_code) {
      requestParams = requestParams.append('q', state_code);
    }

    if (country) {
      requestParams = requestParams.append('q', country);
    }

    return this.http.get<IGeoCodingData[]>(url, { params: requestParams });
  }

  // For now returning only current and daily (for PoP/Probability of precipitation/Chance of rain) data only.
  public getWeatherData(lon: number, lat: number, units: string): Observable<IWeatherData> {
    const url: string = `${environment.api_url}data/2.5/onecall`;
    let requestParams: HttpParams = new HttpParams();

    requestParams = requestParams.set('lon', lon);
    requestParams = requestParams.set('lat', lat);
    requestParams = requestParams.set('units', units);
    requestParams = requestParams.set('exclude', 'minutely,hourly,alerts');
   
    return this.http.get<IWeatherData>(url, { params: requestParams });
  }
}
