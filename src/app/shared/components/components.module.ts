import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherCardComponent } from './weather-card/weather-card.component';
import { PipesModule } from '../pipes/pipes.module';

@NgModule({
  declarations: [
    WeatherCardComponent
  ],
  imports: [
    CommonModule, 
    PipesModule
  ], 
  exports: [
    WeatherCardComponent
  ]
})
export class ComponentsModule { }
