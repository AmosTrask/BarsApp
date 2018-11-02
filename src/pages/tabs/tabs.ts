import { Component } from '@angular/core';

import { OffersPage } from '../offers/offers';
import { HomePage } from '../home/home';
import { BarsPage } from '../bars/bars';
import { MapPage } from '../map/map';
import { EventsPage } from '../events/events';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = OffersPage;
  tab3Root = BarsPage;
  tab4Root = MapPage;
  tab5Root = EventsPage;

  constructor() {

  }
}
