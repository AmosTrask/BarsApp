import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Bar } from '../../entities/bar';

@Component({
  selector: 'page-barDetails',
  templateUrl: 'barDetails.html',
})
export class BarDetaillsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

}
