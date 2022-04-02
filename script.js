'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

let a;
let b;
let kordinata;
let map;
let c = 1;

// class Mashq {
//   date = new Date();
//   id = (Date.now() + '').slice(-8);
//   constructor(masofa, vaqti, turganOrnimiz) {
//     this.masofa = masofa;
//     this.vaqti = vaqti;
//     this.turganOrnimiz = turganOrnimiz;
//   }
//   _setTavsif() {
//     const months = [
//       'January',
//       'February',
//       'March',
//       'April',
//       'May',
//       'June',
//       'July',
//       'August',
//       'September',
//       'October',
//       'November',
//       'December',
//     ];
//     this.tavsif = `${this.type}`
//   }

// }
let bir;
let ikki;
let uch;
let tort;
let birMarker;
let ikkiMarker;
let greenIcon;

class App {
  #mashqlar = [];
  constructor() {
    this._getCurrentPosition();
    // this._birinchiNuqta();
  }
  // 1-qayerda turganimizni aniqlab olamiz
  _getCurrentPosition() {
    navigator.geolocation.getCurrentPosition(
      this._showMap.bind(this),
      function () {
        alert('topolmadi');
      }
    );
  }

  _showMap(e) {
    a = e.coords.latitude;
    b = e.coords.longitude;

    map = L.map('map').setView([a, b], 13);
    console.log(map);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    this._ikkinchiNuqta(this);
    this._birinchiNuqta();
  }

  _birinchiNuqta() {
    document.addEventListener('keydown', function (e) {
      // console.log(e);
      if (e.key == 'Enter' && c == 1) {
        c++;

        birMarker = L.marker([a, b], {
          icon: greenIcon,
          draggable: true,
        })
          .on('move', function (e) {
            bir = e.latlng.lat;
            ikki = e.latlng.lng;
          })
          .addTo(map)
          .bindPopup(
            L.popup({
              maxWidth: 250,
              minWidth: 50,
              autoClose: false,
              closeOnClick: false,
              className: `running-popup`,
            }).setContent(`One point`)
          )
          .openPopup();

        // bir = marker.getlatlng();

        // console.log(c);
      }
    });
    greenIcon = new L.Icon({
      iconUrl:
        'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
      shadowUrl:
        'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    });
  }

  _ikkinchiNuqta(e) {
    let d = e;
    document.addEventListener('keydown', function (e) {
      kordinata = [a, b];
      if (c == 2 && e.key == 'Enter') {
        c++;

        ikkiMarker = L.marker([a, b], {
          draggable: false,
          icon: greenIcon,
        })
          .on('move', function (e) {
            uch = e.latLng.lat;
            tort = e.latLng.lng;
          })
          .addTo(map)
          .bindPopup(
            L.popup({
              maxWidth: 250,
              minWidth: 50,
              autoClose: false,
              closeOnClick: false,
              className: `running-popup`,
            }).setContent(`second point`)
          )
          .openPopup();
      } else if (c == 3) {
        c++;
        d._yolniChizish();
        d._ochiribYoqish();
        // console.log(bir);
        // console.log(ikki);
        // console.log(a);
        // console.log(tort);
      }
    });
    greenIcon = new L.Icon({
      iconUrl:
        'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
      shadowUrl:
        'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    });
  }

  // 3.ikkinchi nuqtani olib shu joyga yangisini yaratish
  _ochiribYoqish() {
    L.marker([bir, ikki], {
      draggable: false,
    })
      .addTo(map)
      .bindPopup(
        L.popup({
          maxWidth: 250,
          minWidth: 50,
          autoClose: false,
          closeOnClick: false,
          className: 'running-popup',
        }).setContent('ikkinchi sariq nuqta')
      )
      .openPopup();

    map.removeLayer(birMarker);
  }

  // 3.yolni chizish
  _yolniChizish() {
    console.log(bir);
    console.log(ikki);
    console.log(a);
    console.log(b);
    L.Routing.control({
      waypoints: [L.latLng(bir, ikki), L.latLng(a, b)],

      lineOptions: { styles: [{ color: 'blue', opacity: 1, weight: 5 }] },
    })
      .on('routesfound', function (e) {
        console.log(e.routes[1].summary.totalDistance);
      })
      .addTo(map);

    let btn = document.querySelector('.leaflet-routing-container');

    btn.addEventListener('click', function () {
      btn.classList.toggle('leaflet-routing-container-hide');
    });
  }
}

let magicMap = new App();

setTimeout(function () {
  console.log(a, b);
}, 3000);

// console.log(c);
