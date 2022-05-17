/* eslint-disable import/prefer-default-export */
// import weatherData from './index';
// import { decideWeather } from './index';

// add current weather to DOM
function addCurrentWeather(weatherObject) {
  const container = document.getElementById('container');
  const currentContainer = document.createElement('div');
  currentContainer.setAttribute('id', 'currentContainer');
  const currentTemp = document.createElement('div');
  currentTemp.setAttribute('id', 'currentTemp');
  currentTemp.textContent = `${weatherObject.current.temp}\u00B0`;
  const city = document.createElement('div');
  city.setAttribute('id', 'city');
  city.textContent = weatherObject.current.city;
  const minTemp = document.createElement('div');
  minTemp.setAttribute('id', 'minTemp');
  minTemp.textContent = `Low: ${weatherObject.current.tempMin}\u00B0`;
  const maxTemp = document.createElement('div');
  maxTemp.setAttribute('id', 'maxTemp');
  maxTemp.textContent = ` High: ${weatherObject.current.tempMax}\u00B0`;
  const sky = document.createElement('div');
  sky.setAttribute('id', 'sky');
  sky.textContent = weatherObject.current.sky;
  currentContainer.appendChild(city);
  currentContainer.appendChild(currentTemp);
  currentContainer.appendChild(minTemp);
  currentContainer.appendChild(maxTemp);
  currentContainer.appendChild(sky);
  container.appendChild(currentContainer);
}

// determine which image should be used to represent weather conditions
function decideWeather(skyIcon) {
  let imgAdd;

  if (skyIcon === 'Clear') {
    imgAdd = './icons/sunny.png';
  } else if (skyIcon === 'Clouds') {
    imgAdd = './icons/cloudy-day.png';
  } else if (skyIcon === 'Snow') {
    imgAdd = './icons/snowfall.png';
  } else if (skyIcon === 'Rain' || skyIcon === 'Drizzle') {
    imgAdd = './icons/downpour.png';
  } else if (skyIcon === 'Thunderstorm') {
    imgAdd = './icons/dark-and-stormy.png';
  } else {
    imgAdd = './icons/cloudy-day.png';
  }

  return imgAdd;
}

// add 7 day forecast to DOM
function addFutureWeather(weatherObject) {
  const container = document.getElementById('container');
  const futureContainer = document.createElement('div');
  futureContainer.setAttribute('id', 'futureContainer');

  const futureDays = weatherObject.futureWeather;
  // add each day to DOM at a time
  for (let i = 0; i < 6; i += 1) {
    const day = futureDays[i];
    const futureDay = document.createElement('div');
    futureDay.setAttribute('class', 'futureDay');
    const dayTitle = document.createElement('div');
    dayTitle.setAttribute('class', 'dayTitle');
    dayTitle.textContent = day.futureDay;
    const futureSky = document.createElement('div');
    futureSky.setAttribute('class', 'futureSky');
    futureSky.textContent = day.futureSky;
    const futureMax = document.createElement('futureMax');
    futureMax.setAttribute('class', 'futureMax');
    futureMax.textContent = `High: ${day.futureMax}\u00B0`;
    const futureMin = document.createElement('div');
    futureMin.setAttribute('class', 'futureMin');
    futureMin.textContent = `Low: ${day.futureMin}\u00B0`;
    const skyImg = document.createElement('img');
    const imgAdd = decideWeather(day.futureIcon);
    skyImg.setAttribute('class', 'weatherIcon');
    skyImg.src = `${imgAdd}`;
    futureDay.appendChild(dayTitle);
    futureDay.appendChild(skyImg);
    futureDay.appendChild(futureSky);
    futureDay.appendChild(futureMax);
    futureDay.appendChild(futureMin);
    futureContainer.appendChild(futureDay);
  }
  container.appendChild(futureContainer);
}

// create element to hold html content
function addContainer() {
  const content = document.getElementById('content');
  const currentContainer = document.createElement('div');
  currentContainer.setAttribute('id', 'container');
  content.appendChild(currentContainer);
}

// delete element holding html content
function removeContainer() {
  const content = document.getElementById('content');
  const currentContainer = document.getElementById('container');
  if (currentContainer) {
    content.removeChild(currentContainer);
  }
}

// call all previous functions
function displayWeather(weatherObject) {
  removeContainer();
  addContainer();
  addCurrentWeather(weatherObject);
  addFutureWeather(weatherObject);
}
export { displayWeather };
