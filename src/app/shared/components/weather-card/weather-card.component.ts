import { Component, Input } from '@angular/core';
import { IWeatherCardData } from 'src/app/interfaces';

@Component({
  selector: 'app-weather-card',
  templateUrl: './weather-card.component.html',
  styleUrls: ['./weather-card.component.scss']
})
export class WeatherCardComponent {
  @Input() data!: IWeatherCardData;
}
