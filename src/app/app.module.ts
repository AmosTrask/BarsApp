import { NgModule, ErrorHandler } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { BarsPage } from '../pages/bars/bars';
import { EventsPage } from '../pages/events/events';
import { DrinkOffersPage } from '../pages/drinkOffers/drinkOffers';
import { MapPage } from '../pages/map/map';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';
import { LoginService } from '../services/login.service';
import { AuthService } from '../services/auth.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from '../services/auth.interceptor';

@NgModule({
  declarations: [
    MyApp,
    DrinkOffersPage,
    BarsPage,
    EventsPage,
    MapPage,
    HomePage,
    TabsPage,
    LoginPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    DrinkOffersPage,
    BarsPage,
    EventsPage,
    MapPage,
    HomePage,
    TabsPage,
    LoginPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    LoginService,
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
  ]
})
export class AppModule {}
