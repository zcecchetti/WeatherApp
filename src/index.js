import './style.css';
import { format, addDays } from 'date-fns';

const apiKey = 'b28c7ed03e1d13347ecb843c2c580d4c';

// create object that holds weather data for user input city
function weatherData(jsonForecast) {
  const { temp } = jsonForecast.current;
  const { humidity } = jsonForecast.current;
  const day0 = jsonForecast.daily[0];
  const tempMax = day0.temp.max;
  const tempMin = day0.temp.min;
  const weather = jsonForecast.current.weather[0];
  const sky = weather.main;
  const today = format(new Date(), 'EEEE, MMMM d');
  const current = {
    temp, humidity, tempMax, tempMin, sky, today,
  };

  // create dictionaries to store future weather data by day
  const futureWeather = [];

  for (let i = 1; i < 8; i += 1) {
    const day = jsonForecast.daily[i];
    const futureTemp = day.temp.day;
    const futureMax = day.temp.max;
    const futureMin = day.temp.min;
    const skyWeather = day.weather[0];
    const futureSky = skyWeather.main;
    const futureDay = format(addDays(new Date(), i), 'EEEE, MMMM d');
    futureWeather[i - 1] = {
      futureTemp, futureMax, futureMin, futureSky, futureDay,
    };
  }

  return {
    current, futureWeather,
  };
}

// async function to get weather data from API and create object to store data
async function getWeather(longitude, latitude) {
  try {
    const weather = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely,alerts&appid=${apiKey}&units=imperial`, { mode: 'cors' });
    const jsonForecast = await weather.json();
    const userWeather = weatherData(jsonForecast);
    console.log('current weather:', jsonForecast, userWeather);
  } catch {
    console.log('err');
  }
}

// async function to get longitude and latitude from API using user input city
async function getLocationAndWeather(city, state, country) {
  const userState = state.toLowerCase();
  const userCountry = country.toLowerCase();
  try {
    const location = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city},${userState},${userCountry}&limit=1&appid=${apiKey}`, { mode: 'cors' });
    const geoJson = await location.json();
    const cityLoc = geoJson[0];
    const longitude = cityLoc.lon;
    const latitude = cityLoc.lat;
    getWeather(longitude, latitude);
  } catch {
    console.log('err');
  }
}

// call functions
getLocationAndWeather('stockton', 'ca', 'us');
