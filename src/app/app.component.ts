import { Component, OnInit } from '@angular/core';
import { IWeatherData } from './interfaces';
import { WeatherService } from './services/weather/weather.service';
import { forkJoin, Observable } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'], 
  providers: [WeatherService]
})
export class AppComponent implements OnInit {
  public list$!: Observable<IWeatherData[]>;

  constructor(private service: WeatherService) { }

  ngOnInit(): void {
    this.list$ = forkJoin(['London', 'Paris', 'New York', 'Los Angeles','Tokyo'].map((city: string) =>
      this.service.getCurrentWeatherData(city, 'metric')
    ));
  }
} 