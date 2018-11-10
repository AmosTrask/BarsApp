import { NgModule, ErrorHandler } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { IonicSelectableModule } from 'ionic-selectable';
import { MyApp } from './app.component';

import { BarsPage } from '../pages/bars/bars';
import { EventsPage } from '../pages/events/events';
import { OffersPage } from '../pages/offers/offers';
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
import { SignupPage } from '../pages/signup/signup';
import { UserService } from '../services/user.service';
import { BarsService } from '../services/bars.services';
import { BarDetaillsPage } from '../pages/barDetails/barDetails';
import { OffersService } from '../services/offers.service';
import { EventsService } from '../services/events.service';
import { ProductService } from '../services/products.service';

@NgModule({
  declarations: [
    MyApp,
    OffersPage,
    BarsPage,
    EventsPage,
    MapPage,
    HomePage,
    TabsPage,
    LoginPage,
    SignupPage,
    BarDetaillsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    IonicSelectableModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    OffersPage,
    BarsPage,
    EventsPage,
    MapPage,
    HomePage,
    TabsPage,
    LoginPage,
    SignupPage,
    BarDetaillsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    LoginService,
    AuthService,
    UserService,
    BarsService,
    OffersService,
    ProductService,
    EventsService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
  ]
})
export class AppModule {}
