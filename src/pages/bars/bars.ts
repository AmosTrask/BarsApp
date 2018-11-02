import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Bar } from '../../entities/bar';
import { BarsService } from '../../services/bars.services';

@Component({
  selector: 'page-bars',
  templateUrl: 'bars.html',
})
export class BarsPage {

  bars: Bar[];

  constructor(public navCtrl: NavController, public navParams: NavParams, private barService: BarsService) {
    this.getAllBars();
  }

  getAllBars() {
    this.barService.getAllBars().subscribe( (bars) => {
      this.bars = bars;
    });
  }
}
