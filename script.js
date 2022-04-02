'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');
const input = document.querySelector('.inputC');
const btnS = document.querySelector('.btnS');
let btnn;
let a = 1;
let countriesSet = new Set();
let aa = 0;
/////////////////////////////////
// getLocal();

function render(data) {
  let html = ` 
<article class="country">
<button class="btnDel">X</button>
<img class="country__img" src="${data.flag}" />
<div class="country__data">
 <h3 class="country__name">${data.name}</h3>
 <h4 class="country__region">${data.region}</h4>
  <p class="country__row"><span>👫</span>${(data.population / 1000000).toFixed(
    3
  )} people</p>
  <p class="country__row"><span>🗣️</span>${data.languages[0].name} </p>
  <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
</div>
</article>`;
  countriesContainer.insertAdjacentHTML('afterbegin', html);

  countriesContainer.style.opacity = 1;
}
const getCountry = function (country) {
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v2/name/${country}`);
  request.send();
  request.addEventListener('load', function () {
    const [data] = JSON.parse(request.responseText);
    render(data);
  });
};
btnS.addEventListener('click', function (e) {
  countriesContainer.innerHTML = '';
  e.preventDefault();
  countriesSet.add(input.value);
  setLocal();
  for (let el of countriesSet) {
    getCountry(el);
  }
});
countriesContainer.addEventListener('click', function (e) {
  if (e.target.classList.contains('btnDel')) {
    e.target.closest('.country').remove();
  }
});
function setLocal() {
  console.log('salom');
  localStorage.setItem('davlat', JSON.stringify([...countriesSet]));
}
function getLocal() {
  let data = JSON.parse(localStorage.getItem('davlat'));
  return data;
}
if (getLocal()) {
  for (let el of getLocal()) {
    getCountry(el);
    countriesSet.add(el);
  }
}

/**
 * 1.get local
 * 2.render local storage
 * 3.get input
 * 4.find country
 * 5.render country
 * 6.add country to set[]
 * 7.set set[] to local storage
 *
 */
