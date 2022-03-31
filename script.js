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

class App {
  #mashqlar = [];
  constructor() {
    this._getCurrentPosition();
    this._birinchiNuqta();
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
    // console.log(map);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);
  }

  _birinchiNuqta() {
    document.addEventListener('keydown', function (e) {
      console.log(e);
      if (e.key == 'Enter' && c == 1) {
        L.marker([a, b], {
          draggable: true,
        })
          .on('move', function (e) {
            console.log(e.latlng);
          })
          .addTo(map)
          .bindPopup(
            L.popup({
              maxWidth: 250,
              minWidth: 50,
              autoClose: false,
              closeOnClick: false,
              className: `running-popup`,
            }).setContent(`Uree`)
          )
          .openPopup();

        c++;
        console.log(c);
        // ikkinchi nuqta
        document.addEventListener('keydown', function (e) {
          kordinata = [a, b];
          if (c == 2) {
            c++;
            L.marker([a, b], {
              draggable: false,
            })
              .addTo(map)
              .bindPopup(
                L.popup({
                  maxWidth: 250,
                  minWidth: 50,
                  autoClose: false,
                  closeOnClick: false,
                  className: `cycling-popup`,
                }).setContent(`Uree2`)
              )
              .openPopup();
          }
        });
      }
    });
  }

  // _ikkinchiNuqta() {
  //   document.addEventListener('keydown', function (e) {
  //     kordinata = [a, b];
  //     if (c == 2) {
  //       L.marker([a, b], {
  //         draggable: false,
  //       })
  //         .addTo(map)
  //         .bindPopup(
  //           L.popup({
  //             maxWidth: 250,
  //             minWidth: 50,
  //             autoClose: false,
  //             closeOnClick: false,
  //             className: `running-popup`,
  //           }).setContent(`Uree2`)
  //         )
  //         .openPopup();
  //     }
  //   });
  //   this._ikkinchiNuqta();
  // }
}

let magicMap = new App();

setTimeout(function () {
  console.log(a, b);
}, 3000);

console.log(c);
