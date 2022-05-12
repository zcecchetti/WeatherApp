import './style.css';

const apiKey = 'b28c7ed03e1d13347ecb843c2c580d4c';

// create object that holds weather data for user input city
// function weatherData(jsonCurrent, jsonForecast) {
//   const { temp } = jsonCurrent.main;
//   const { humidity } = jsonCurrent.main;
//   const tempMax = jsonCurrent.main.temp_max;
//   const tempMin = jsonCurrent.main.temp_min;
//   return {
//     temp, humidity, tempMax, tempMin, jsonForecast,
//   };
// }

// async function to get weather data from API and create object to store data
async function getWeather(longitude, latitude) {
  try {
    const weather = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=imperial`, { mode: 'cors' });
    const jsonForecast = await weather.json();
    // const userWeather = weatherData(jsonForecast);
    console.log('current weather:', jsonForecast);
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
