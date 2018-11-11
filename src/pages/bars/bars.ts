import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Bar } from '../../entities/bar';
import { BarsService } from '../../services/bars.services';
import { BarDetaillsPage } from '../barDetails/barDetails';

@Component({
  selector: 'page-bars',
  templateUrl: 'bars.html',
})
export class BarsPage {

  bars: Bar[];
  rate: number = 5;

  constructor(public navCtrl: NavController, public navParams: NavParams, private barService: BarsService) {
    this.getAllBars();
  }

  getAllBars() {
    this.barService.getAllBars().subscribe( (bars) => {
      this.bars = bars;
    });
  }

  goToBarDetails(id: string, name: String) {
    this.navCtrl.push(BarDetaillsPage, {'id': id, 'name': name});
  }
  
  onModelChange() {

  }
}
