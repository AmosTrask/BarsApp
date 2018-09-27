import { Component } from '@angular/core';

import { DrinkOffersPage } from '../drinkOffers/drinkOffers';
import { HomePage } from '../home/home';
import { BarsPage } from '../bars/bars';
import { MapPage } from '../map/map';
import { EventsPage } from '../events/events';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = DrinkOffersPage;
  tab3Root = BarsPage;
  tab4Root = MapPage;
  tab5Root = EventsPage;

  constructor() {

  }
}
