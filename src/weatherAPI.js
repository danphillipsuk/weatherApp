import { propertyOf } from "lodash";
import { currentWeather } from './index.js';
let today;
let oneCall;
let city;

async function getWeather (location) {

  if (location == null) {
    location = "London";
  }

  try {
    // Get current weather report to give us city name and lat/lon coordinates
    const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&APPID=5a75251970a67885f4e3d704fe65eed0`, { mode: 'cors' });
    today = await response.json();
    const lat = today.coord.lat; 
    const lon = today.coord.lon;
    city = today.name;
    console.log(today)

    // Use lat/lon cordinates from first fetch to pass into oneCall service, giving us current and forecast data
    const secondResponse = await fetch(`http://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&APPID=5a75251970a67885f4e3d704fe65eed0`, { mode: 'cors' });
    oneCall = await secondResponse.json();
      
  } catch(err) {
    console.log(err)
  }
}

getWeather().then(function () {
  currentWeather(city, oneCall);
})

export { getWeather }



