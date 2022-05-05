import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { WeatherApiInterceptor } from './core/interceptors/weather-api.interceptor';
import { ComponentsModule } from './shared/components/components.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule, 
    HttpClientModule,
    ComponentsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: WeatherApiInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
