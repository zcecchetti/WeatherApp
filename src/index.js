/* eslint-disable import/prefer-default-export */
/* eslint-disable no-console */
import './style.css';
import { format, addDays } from 'date-fns';
import { GeocoderAutocomplete } from '@geoapify/geocoder-autocomplete';
import { displayWeather } from './html';

const apiKey = 'b28c7ed03e1d13347ecb843c2c580d4c';

// store weather data in array in global scope
const weatherArray = [];

// create object that holds weather data for user input city
function weatherData(jsonForecast, location) {
  const { city } = location.properties;
  const { temp } = jsonForecast.current;
  const { humidity } = jsonForecast.current;
  const day0 = jsonForecast.daily[0];
  const tempMax = day0.temp.max;
  const tempMin = day0.temp.min;
  const weather = jsonForecast.current.weather[0];
  const skyIcon = weather.main;
  const sky = weather.description;
  const today = format(new Date(), 'EEEE, MMMM d');
  const current = {
    temp, humidity, tempMax, tempMin, sky, today, city, skyIcon,
  };

  // create dictionaries to store future weather data by day
  const futureWeather = [];

  for (let i = 1; i < 8; i += 1) {
    const day = jsonForecast.daily[i];
    const futureMax = day.temp.max;
    const futureMin = day.temp.min;
    const skyWeather = day.weather[0];
    const futureIcon = skyWeather.main;
    const futureSky = skyWeather.description;
    let futureDay;
    if (i === 1) {
      futureDay = 'Tomorrow';
    } else {
      futureDay = format(addDays(new Date(), i), 'EEEE, MMMM d');
    }
    futureWeather[i - 1] = {
      futureMax, futureMin, futureSky, futureDay, futureIcon,
    };
  }

  return {
    current, futureWeather,
  };
}

// async function to get weather data from API and create object to store data
async function getWeather(location) {
  try {
    const longitude = location.properties.lon;
    const latitude = location.properties.lat;
    const weather = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely,alerts&appid=${apiKey}&units=imperial`, { mode: 'cors' });
    const jsonForecast = await weather.json();
    const weatherObject = await weatherData(jsonForecast, location);
    displayWeather(weatherObject);
  } catch {
    console.log('err');
  }
}

// generate autocompleting search bar to find longitude and latitude then call getWeather function
const autocomplete = new GeocoderAutocomplete(
  document.getElementById('autocomplete'),
  'b0a58b077de948e0a4085085cffda14b',
  { placeholder: 'Enter a City Name', type: 'city' },
);

autocomplete.on('select', (location) => {
  weatherArray[weatherArray.length] = location;
});

// get weatherObject and call getWeather when form submits
function submitSearch() {
  const weatherObject = weatherArray[weatherArray.length - 1];
  getWeather(weatherObject);
}

// add submitSearch to onsubmit
const form = document.getElementById('locationForm');
form.addEventListener('submit', () => {
  submitSearch();
});
form.setAttribute('onsubmit', ';return false');
