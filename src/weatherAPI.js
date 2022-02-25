import { propertyOf } from "lodash";
import { construct } from './factory';

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

    construct(today, oneCall);


  } catch(err) {
    console.log("Sorry, we're haviong trouble")
    console.log(err)
  }
}

getWeather();

export { getWeather }


// getWeather().then(function () {})




