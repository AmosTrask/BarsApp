import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import leaflet from 'leaflet';
import { Bar } from '../../entities/bar';
import { BarsService } from '../../services/bars.services';
import { BarDetaillsPage } from '../barDetails/barDetails';

@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapPage {

  bars: Bar[];

  @ViewChild('map') mapContainer: ElementRef;
  map: any;
  constructor(public navCtrl: NavController, private barService: BarsService) {
    this.getAllBars();
  }

  ionViewDidEnter() {
    if(!this.map && this.bars) this.loadmap();
  }

  getAllBars() {
    this.barService.getAllBars().subscribe( (bars) => {
      this.bars = bars;
      this.loadmap();
    });
  }

  loadmap() {
    this.map = leaflet.map("map").fitWorld();
    leaflet.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attributions: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
      maxZoom: 18
    }).addTo(this.map);
    this.map.locate({
      setView: true,
      maxZoom: 12
    }).on('locationfound', (e) => {
      let markerGroup = leaflet.featureGroup();
      let marker: any = leaflet.marker([e.latitude, e.longitude]);
      markerGroup.addLayer(marker);
      this.map.addLayer(markerGroup);
      }).on('locationerror', (err) => {
        alert(err.message);
    });
    
    let markerBarGroup = leaflet.featureGroup();
    for(let bar of this.bars) {
      let marker: any = leaflet.marker(bar.coordinates);
      var domelem = document.createElement('div');
      domelem.innerHTML = "<b>" + bar.name + "</b><br>" + bar.address;
      const thisComponent = this;
      domelem.onclick = function() {
          thisComponent.goToBarDetails(bar._id, bar.name);
      };
      marker.bindPopup(domelem).openPopup();
     
      markerBarGroup.addLayer(marker);
    }
    this.map.addLayer(markerBarGroup);

    /*let marker: any = leaflet.marker([e.latitude, e.longitude]).on('click', () => {
        alert('Marker clicked');
      })*/
  }

  goToBarDetails(id: number, name: String) {
    this.navCtrl.push(BarDetaillsPage, {'id': id, 'name': name});
  }
}