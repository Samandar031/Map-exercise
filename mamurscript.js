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

let latitude;
let longitude;
let map;
let number = 2;

let tochkaniLati1;
let tochkaniLongi1;

let tochkaniLati2;
let tochkaniLongi2;

let birMarker;
let ikkiMarker;

let greenIcon;

class AppProject {
  constructor() {
    this._getLocation();
  }
  _getLocation() {
    navigator.geolocation.getCurrentPosition(
      this._getCurrentLocation.bind(this),
      function () {
        alert('Error');
      }
    );
  }
  _getCurrentLocation(e) {
    latitude = e.coords.latitude;
    longitude = e.coords.longitude;
    map = L.map('map').setView([latitude, longitude], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);
    this._secondPoint(this);
    this._firstPoint();
  }
  _firstPoint() {
    window.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') {
        if (number == 2) {
          number++;
          birMarker = L.marker([latitude, longitude], {
            icon: greenIcon,
            draggable: true,
          })
            .on('move', function (e) {
              tochkaniLati1 = e.latlng.lat;
              tochkaniLongi1 = e.latlng.lng;
              console.log(tochkaniLongi1);
            })
            .addTo(map)
            .bindPopup(
              L.popup({
                maxWidth: 250,
                minWidth: 50,
                autoClose: false,
                closeOnClick: false,
                className: 'running-popup',
              }).setContent('<h3>Please enter first point</h3>')
            )
            .openPopup();
        }
      }
    });
  }
  _secondPoint(e) {
    let b = e;
    window.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') {
        if (number == 3) {
          number++;
          ikkiMarker = L.marker([latitude, longitude], {
            draggable: true,
          })
            .on('move', function (e) {
              tochkaniLati2 = e.latlng.lat;
              tochkaniLongi2 = e.latlng.lng;
              console.log(tochkaniLati2);
            })
            .addTo(map)
            .bindPopup(
              L.popup({
                maxWidth: 250,
                minWidth: 50,
                autoClose: false,
                closeOnClick: false,
                className: 'cycling-popup',
              }).setContent('<h3>Please enter second point</h3>')
            )
            .openPopup();
        } else if (number == 4) {
          b._yolniChizish();
          b._draggableFalse();
        }
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

  _draggableFalse() {
    L.marker([tochkaniLati1, tochkaniLongi1], {
      draggable: false,
      icon: greenIcon,
    })
      .addTo(map)
      .bindPopup(
        L.popup({
          maxWidth: 250,
          minWidth: 50,
          autoClose: false,
          closeOnClick: false,
          className: 'cycling-popup',
        }).setContent('<h3>Please enter first point</h3>')
      )
      .openPopup();

    map.removeLayer(birMarker);

    console.log(tochkaniLati1);
    console.log(tochkaniLongi1);
    console.log(tochkaniLati2);
    console.log(tochkaniLongi2);
    // birMarker.draggable.disable;
  }
  _yolniChizish() {
    L.Routing.control({
      waypoints: [
        L.latLng(tochkaniLati1, tochkaniLongi1),
        L.latLng(tochkaniLati2, tochkaniLongi2),
      ],

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

const magic = new AppProject();

// let a;
// let b;
// let koordinatasiniOlish;
// let map;

// class mashq {
//   date = new Date();
//   id = (Date.now() + '').slice(-8);
//   constructor(distance, duration, coords) {
//     this.distance = distance;
//     this.duration = duration;
//     this.coords = coords;
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
//     this.tavsif = `${this.type[0].toUpperCase()}${this.type.slice(1)} on ${
//       months[this.date.getMonth()]
//     } ${this.date.getDate()}`;
//   }
// }

// class Yugurish extends mashq {
//   type = 'running';
//   constructor(distance, duration, coords, cadense) {
//     super(distance, duration, coords);
//     this.cadense = cadense;
//     this._setTavsif();
//   }
// }

// class Velik extends mashq {
//   type = 'cycling';
//   constructor(distance, duration, coords, elevation) {
//     super(distance, duration, coords);
//     this.elevation = elevation;
//     this._setTavsif();
//   }
// }

// // let yugurUmid = new Yugurish(2, 1, [23, 34], 100);
// // let haydaUmid = new Velik(2, 1, [23, 34], 1);
// // console.log(yugurUmid, haydaUmid);

// class App {
//   #mashqlar = [];
//   constructor() {
//     this._getCurrentPosition();
//     inputType.addEventListener('change', this._selectToggle);
//     form.addEventListener('submit', this._createObject.bind(this));
//     containerWorkouts.addEventListener('click', this._moveCenter.bind(this));
//   }
//   // 1-qayerda turganimizni aniqlab olish
//   _getCurrentPosition() {
//     navigator.geolocation.getCurrentPosition(
//       this._showMap.bind(this),
//       function () {
//         alert('Cannot find your current location');
//       }
//     );
//   }
//   // 2-turgan ornimizni mapga kiritish
//   _showMap(e) {
//     a = e.coords.latitude;
//     b = e.coords.longitude;

//     map = L.map('map').setView([a, b], 13);

//     L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//       attribution:
//         '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
//     }).addTo(map);

//     L.marker([a, b])
//       .addTo(map)
//       .bindPopup(
//         L.popup({
//           maxWidth: 250,
//           minWidth: 50,
//           autoClose: false,
//           closeOnClick: false,
//         }).setContent('<h1>Hello World</h1>')
//       )
//       .openPopup();
//     L.Routing.control({
//       waypoints: [L.latLng(a, b), L.latLng(a + 0.05, b + 0.05)],

//       lineOptions: { styles: [{ color: 'blue', opacity: 1, weight: 5 }] },
//     })
//       .on('routesfound', function (e) {
//         console.log(e.routes[1].summary.totalDistance);
//       })
//       .addTo(map);

//     let btn = document.querySelector('.leaflet-routing-container');

//     btn.addEventListener('click', function () {
//       btn.classList.toggle('leaflet-routing-container-hide');
//     });

//     this._showForm();
//     this._getLocalStorage();
//   }
//   // 3-formani ochish
//   _showForm() {
//     map.on('click', function (e) {
//       koordinatasiniOlish = e;
//       form.classList.remove('hidden');
//       inputDistance.focus();
//     });
//   }
//   // select optionni ozgarganda inputni ham ozgartirish
//   _selectToggle() {
//     inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
//     inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
//   }

//   //  Forma submit boganda markerni mapga chiqarish
//   _setMarker(obj) {
//     L.marker(obj.coords)
//       .addTo(map)
//       .bindPopup(
//         L.popup({
//           maxWidth: 250,
//           minWidth: 50,
//           autoClose: false,
//           closeOnClick: false,
//           className: `${obj.type}-popup`,
//         }).setContent(`${obj.tavsif}`)
//       )
//       .openPopup();
//     this._hideForm();
//   }
//   // Formaga submit bosilganda  formani  yopish metodi
//   _hideForm() {
//     inputCadence.value =
//       inputDistance.value =
//       inputDuration.value =
//       inputElevation.value =
//         '';
//     form.classList.add('hidden');
//   }
//   // Formadan malumotlarni oqib object yaratish (yugirish va Velik klasslardan foydalanib)
//   _createObject(e) {
//     e.preventDefault();
//     let mashq = '';
//     let numbermi = (...inputs) => {
//       return inputs.every(val => Number.isFinite(val));
//     };
//     let musbatmi = (...inputs) => {
//       return inputs.every(val => val > 0);
//     };
//     let distance = +inputDistance.value;
//     let duration = +inputDuration.value;
//     let type = inputType.value;
//     if (type === 'running') {
//       let cadense = +inputCadence.value;
//       if (
//         !numbermi(distance, duration, cadense) ||
//         !musbatmi(distance, duration, cadense)
//       ) {
//         return alert("Xato ma'lumotlar kiritildi");
//       }
//       mashq = new Yugurish(
//         distance,
//         duration,
//         [koordinatasiniOlish.latlng.lat, koordinatasiniOlish.latlng.lng],
//         cadense
//       );
//       console.log(mashq);
//     }
//     if (type === 'cycling') {
//       let elevation = +inputElevation.value;
//       if (
//         !numbermi(distance, duration, elevation) ||
//         !musbatmi(distance, duration)
//       ) {
//         return alert("Xato ma'lumotlar kiritildi");
//       }
//       mashq = new Velik(
//         distance,
//         duration,
//         [koordinatasiniOlish.latlng.lat, koordinatasiniOlish.latlng.lng],
//         elevation
//       );
//       console.log(mashq);
//     }
//     // Mashq obyektini mashqlar arrayiga push qilish metodi
//     this.#mashqlar.push(mashq);
//     //Local storage
//     this._setLocalStorage();
//     //Mashq objdagi markerlarni qoyish uchun
//     this._setMarker(mashq);
//     //Mashqlar royhatini choqarish
//     this._renderList(mashq);
//   }
//   // Mashqlar royhatini chiqarish

//   _renderList(obj) {
//     let html = `<li class="workout workout--${obj.type}" data-id="${obj.id}">
//     <h2 class="workout__title">${obj.tavsif}</h2>
//     <div class="workout__details">
//       <span class="workout__icon">${obj.type === 'running' ? '🏃‍♂️' : '🚴‍♀️'}</span>
//       <span class="workout__value">${obj.distance}</span>
//       <span class="workout__unit">km</span>
//     </div>
//     <div class="workout__details">
//       <span class="workout__icon">⏱</span>
//       <span class="workout__value">24</span>
//       <span class="workout__unit">min</span>
//     </div>`;

//     if (obj.type === 'running') {
//       html += `  <div class="workout__details">
//         <span class="workout__icon">⚡️</span>
//         <span class="workout__value">${Math.trunc(
//           obj.distance / obj.duration
//         )}</span>
//         <span class="workout__unit">min/km</span>
//       </div>
//       <div class="workout__details">
//         <span class="workout__icon">🦶🏼</span>
//         <span class="workout__value">${obj.cadense}</span>
//         <span class="workout__unit">spm</span>
//       </div>
//       </li>`;
//     }
//     if (obj.type === 'cycling') {
//       html += `<div class="workout__details">
//             <span class="workout__icon">⚡️</span>
//             <span class="workout__value">${
//               obj.distance / (obj.duration / 60)
//             }</span>
//             <span class="workout__unit">km/h</span>
//           </div>
//           <div class="workout__details">
//             <span class="workout__icon">⛰</span>
//             <span class="workout__value">${obj.elevation}</span>
//             <span class="workout__unit">m</span>
//           </div>
//        </li>`;
//     }
//     form.insertAdjacentHTML('afterend', html);
//   }

//   // local storagega saqlash
//   _setLocalStorage() {
//     localStorage.setItem('mashqlar100', JSON.stringify(this.#mashqlar));
//   }
//   // Malumotlarni local storagedan olish
//   _getLocalStorage() {
//     let data = JSON.parse(localStorage.getItem('mashqlar100'));
//     if (!data) return;
//     this.#mashqlar = data;
//     this.#mashqlar.forEach(val => {
//       this._renderList(val);
//       this._setMarker(val);
//     });
//   }
//   removeLocalStorage() {
//     localStorage.removeItem('mashqlar100');
//     location.reload;
//   }
//   _moveCenter(e) {
//     let element = e.target.closest('.workout');

//     if (!element) return;

//     let elementId = element.getAttribute('data-id');

//     let objs = this.#mashqlar.find(val => {
//       return val.id === elementId;
//     });

//     map.setView(objs.coords, 13, {
//       animate: true,
//       pan: {
//         duration: 2,
//       },
//     });
//     // L.circle(objs.coords, { radius: 100 }).addTo(map);
//     console.log(objs);
//   }
// }

// let magicMap = new App();

// magicMap.removeLocalStorage();

// setTimeout(function () {
//   console.log(a, b);
// }, 3000);
