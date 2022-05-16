/* eslint-disable import/prefer-default-export */
/* eslint-disable no-console */
import './style.css';
import { format, addDays } from 'date-fns';
import { GeocoderAutocomplete } from '@geoapify/geocoder-autocomplete';
import { addCurrentWeather, addFutureWeather } from './html';

const apiKey = 'b28c7ed03e1d13347ecb843c2c580d4c';

// store weather data in array in global scope
const weatherArray = [];

// create object that holds weather data for user input city
const weatherData = function (jsonForecast, location) {
  const { city } = location.properties;
  const { temp } = jsonForecast.current;
  const { humidity } = jsonForecast.current;
  const day0 = jsonForecast.daily[0];
  const tempMax = day0.temp.max;
  const tempMin = day0.temp.min;
  const weather = jsonForecast.current.weather[0];
  const sky = weather.main;
  const today = format(new Date(), 'EEEE, MMMM d');
  const current = {
    temp, humidity, tempMax, tempMin, sky, today, city,
  };

  // create dictionaries to store future weather data by day
  const futureWeather = [];

  for (let i = 1; i < 8; i += 1) {
    const day = jsonForecast.daily[i];
    const futureMax = day.temp.max;
    const futureMin = day.temp.min;
    const skyWeather = day.weather[0];
    const futureSky = skyWeather.main;
    const futureDay = format(addDays(new Date(), i), 'EEEE, MMMM d');
    futureWeather[i - 1] = {
      futureMax, futureMin, futureSky, futureDay,
    };
  }

  return {
    current, futureWeather,
  };
};

// async function to get weather data from API and create object to store data
async function getWeather(location) {
  try {
    const longitude = location.properties.lon;
    const latitude = location.properties.lat;
    const weather = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely,alerts&appid=${apiKey}&units=imperial`, { mode: 'cors' });
    const jsonForecast = await weather.json();
    const userWeather = await weatherData(jsonForecast, location);
    // console.log('current weather:', userWeather);
    weatherArray[weatherArray.length] = userWeather;
  } catch {
    console.log('err');
  }
}

// generate autocompleting search bar to find longitude and latitude then call getWeather function
const autocomplete = new GeocoderAutocomplete(
  document.getElementById('autocomplete'),
  'b0a58b077de948e0a4085085cffda14b',
  { type: 'city' },
);

// const searchButton = document.getElementById('searchWeather');
autocomplete.on('select', (location) => {
  getWeather(location);
});

const searchButton = document.getElementById('searchWeather');
searchButton.addEventListener('click', () => {
  const weatherObject = weatherArray[weatherArray.length - 1];
  addCurrentWeather(weatherObject);
  addFutureWeather(weatherObject);
//   console.log(weatherArray[weatherArray.length - 1]);
});
