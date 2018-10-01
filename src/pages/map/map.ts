import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import leaflet from 'leaflet';
import { Bar } from '../../entities/bar';

@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapPage {

  bars: Bar[] = [
    {
      name: "Flannery",
      adress: "test",
      lat: 52.663171,
      lng: -8.623426,
      hours: [{
        day: {
          fullName: "Monday",
          reducedName: "Mo"
        },
        open: 10,
        close: 23
      },
      {
        day: {
          fullName: "Tuesday",
          reducedName: "Tu"
        },
        open: 10,
        close: 23
      }
      ]
    },
    {
      name: "O'Nelly",
      adress: "test",
      lat: 52.664807,
      lng: -8.625606,
      hours: [{
        day: {
          fullName: "Monday",
          reducedName: "Mo"
        },
        open: 10,
        close: 23
      }]
    }]

  @ViewChild('map') mapContainer: ElementRef;
  map: any;
  constructor(public navCtrl: NavController) {

  }

  ionViewDidEnter() {
    if(!this.map) this.loadmap();
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
      let marker: any = leaflet.marker([bar.lat, bar.lng], {color: '#44444'});
      markerBarGroup.addLayer(marker);
    }
    this.map.addLayer(markerBarGroup);

    /*let marker: any = leaflet.marker([e.latitude, e.longitude]).on('click', () => {
        alert('Marker clicked');
      })*/
  }

}