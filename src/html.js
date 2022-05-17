/* eslint-disable import/prefer-default-export */
// import weatherData from './index';

// add current weather to DOM
function addCurrentWeather(weatherObject) {
  const container = document.getElementById('container');
  const currentContainer = document.createElement('div');
  currentContainer.setAttribute('id', 'currentContainer');
  const currentTemp = document.createElement('div');
  currentTemp.setAttribute('id', 'currentTemp');
  currentTemp.textContent = weatherObject.current.temp;
  const city = document.createElement('div');
  city.setAttribute('id', 'city');
  city.textContent = weatherObject.current.city;
  const minTemp = document.createElement('div');
  minTemp.setAttribute('id', 'minTemp');
  minTemp.textContent = weatherObject.current.tempMin;
  const maxTemp = document.createElement('div');
  maxTemp.setAttribute('id', 'maxTemp');
  maxTemp.textContent = weatherObject.current.tempMax;
  currentContainer.appendChild(city);
  currentContainer.appendChild(currentTemp);
  currentContainer.appendChild(minTemp);
  currentContainer.appendChild(maxTemp);
  container.appendChild(currentContainer);
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
    futureDay.textContent = `${day.futureDay} Max: ${day.futureMax} Min: ${day.futureMin}`;
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
