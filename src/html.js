/* eslint-disable import/prefer-default-export */
// import weatherData from './index';

// add current weather to DOM
function addCurrentWeather(weatherObject) {
  const container = document.getElementById('container');
  const currentContainer = document.createElement('div');
  currentContainer.textContent = `${weatherObject.current.temp} ${weatherObject.current.city}`;
  container.appendChild(currentContainer);
}

// add 7 day forecast to DOM
function addFutureWeather(weatherObject) {
  const container = document.getElementById('container');

  const futureDays = weatherObject.futureWeather;
  // add each day to DOM at a time
  for (let i = 0; i < 6; i += 1) {
    const day = futureDays[i];
    const futureContainer = document.createElement('div');
    futureContainer.textContent = `${day.futureDay} Max: ${day.futureMax} Min: ${day.futureMin}`;
    container.appendChild(futureContainer);
  }
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
