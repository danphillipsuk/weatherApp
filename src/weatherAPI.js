import { propertyOf } from "lodash";
import { buildApp } from './index.js';

let today;
let oneCall;

async function getWeather (location) {

  if (!location) {
    location = "New York";
  }

  try {
    // Get current weather report to give us city name and lat/lon coordinates
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&APPID=5a75251970a67885f4e3d704fe65eed0`, { mode: 'cors' });
    today = await response.json();
    const lat = today.coord.lat; 
    const lon = today.coord.lon;

    // Use lat/lon cordinates from first fetch to pass into oneCall service, giving us current and forecast data
    const secondResponse = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&APPID=5a75251970a67885f4e3d704fe65eed0`, { mode: 'cors' });
    oneCall = await secondResponse.json();

    construct(today, oneCall);

  } catch(err) {
    console.log("Sorry, we're haviong trouble")
    console.log(err)
  }
}

  function construct (today, oneCall) {
    console.log("constructor")
    const todaysWeatherFactory = (
      city, country, weatherID, description, temperature, high, low, feelsLike, humidity, uvIndex, visibility, sunrise, sunset, timezone, tomorrowSunrise, windDeg, windSpeed, windGust ) => {
        return { city, country, weatherID, description, temperature, high, low, feelsLike, humidity, uvIndex, visibility, sunrise, sunset, timezone, tomorrowSunrise, windDeg, windSpeed, windGust }
    }

    let todaysForecast, hourlyArray, daily;
  
    todaysForecast = todaysWeatherFactory(today.name, today.sys.country, oneCall.current.weather[0].id, oneCall.current.weather[0].description, oneCall.current.temp, oneCall.daily[0].temp.max, oneCall.daily[0].temp.min,
      oneCall.current.feels_like, oneCall.current.humidity, oneCall.current.uvi, oneCall.current.visibility, oneCall.current.sunrise, oneCall.current.sunset, oneCall.timezone_offset, oneCall.daily[1].sunrise, oneCall.current.wind_deg, oneCall.current.wind_speed, oneCall.current.wind_gust);
  
      hourlyArray = oneCall.hourly;
      daily = oneCall.daily;

      buildApp(todaysForecast, hourlyArray, daily);

  }

getWeather();
// getWeather().then(function () {

//   const todaysWeatherFactory = (
//     city, country, weatherID, description, temperature, high, low, feelsLike, humidity, uvIndex, visibility, sunrise, sunset, timezone, tomorrowSunrise, windDeg, windSpeed, windGust ) => {
//       return { city, country, weatherID, description, temperature, high, low, feelsLike, humidity, uvIndex, visibility, sunrise, sunset, timezone, tomorrowSunrise, windDeg, windSpeed, windGust }
//   }

//   const todaysForecast = todaysWeatherFactory(today.name, today.sys.country, oneCall.current.weather[0].id, oneCall.current.weather[0].description, oneCall.current.temp, oneCall.daily[0].temp.max, oneCall.daily[0].temp.min,
//     oneCall.current.feels_like, oneCall.current.humidity, oneCall.current.uvi, oneCall.current.visibility, oneCall.current.sunrise, oneCall.current.sunset, oneCall.timezone_offset, oneCall.daily[1].sunrise, oneCall.current.wind_deg, oneCall.current.wind_speed, oneCall.current.wind_gust);

//     const hourlyArray = oneCall.hourly;
//     const daily = oneCall.daily;

//     // localStorage.setItem("today", JSON.stringify(todaysForecast));
//     // localStorage.setItem("hours", JSON.stringify(hourlyArray));
//     // localStorage.setItem("sevendays", JSON.stringify(daily));

//   buildApp(todaysForecast, hourlyArray, todaysForecast.timezone, daily);


//   return;
// })

export { getWeather }



