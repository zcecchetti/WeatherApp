/* eslint-disable import/prefer-default-export */
// import weatherData from './index';

// add current weather to DOM
function addCurrentWeather(weatherObject) {
  const container = document.getElementById('content');
  const currentContainer = document.createElement('div');
  currentContainer.textContent = `${weatherObject.current.temp} ${weatherObject.current.city}`;
  container.appendChild(currentContainer);
}

// add 7 day forecast to DOM
function addFutureWeather(weatherObject) {
  const container = document.getElementById('content');

  const futureDays = weatherObject.futureWeather;
  // add each day to DOM at a time
  for (let i = 0; i < 6; i += 1) {
    const day = futureDays[i];
    const futureContainer = document.createElement('div');
    futureContainer.textContent = `${day.futureDay} Max: ${day.futureMax} Min: ${day.futureMin}`;
    container.appendChild(futureContainer);
  }
}

export { addCurrentWeather, addFutureWeather };
