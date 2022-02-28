import { propertyOf } from "lodash";
import { WeatherClass }  from './weatherClass';
import { buildApp } from './index.js';

let today, oneCall;

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

    const weatherData = new WeatherClass (oneCall.current.dt, today.name, today.sys.country, oneCall.current.weather[0].id, oneCall.current.weather[0].description, oneCall.current.temp, oneCall.daily[0].temp.max, oneCall.daily[0].temp.min,
      oneCall.current.feels_like, oneCall.current.humidity, oneCall.current.uvi, oneCall.current.visibility, oneCall.current.sunrise, oneCall.current.sunset, oneCall.timezone_offset, oneCall.current.wind_deg, oneCall.current.wind_speed, oneCall.current.wind_gust, oneCall.hourly, oneCall.daily);
  
    buildApp(weatherData);
  
  } catch(err) {
    console.log("Sorry, we're having trouble")
    console.log(err)
  }
}



// getWeather().then(function () {
//   const weatherData = new WeatherClass (today.name, today.sys.country, oneCall.current.weather[0].id, oneCall.current.weather[0].description, oneCall.current.temp, oneCall.daily[0].temp.max, oneCall.daily[0].temp.min, oneCall.current.feels_like, oneCall.current.humidity, oneCall.current.uvi, oneCall.current.visibility, oneCall.current.sunrise, oneCall.current.sunset, oneCall.timezone_offset, oneCall.current.wind_deg, oneCall.current.wind_speed, oneCall.current.wind_gust, oneCall.hourly, oneCall.daily);

//   buildApp(weatherData);

// })

getWeather();

export { getWeather }







