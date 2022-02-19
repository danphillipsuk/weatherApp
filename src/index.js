import _ from 'lodash';
import './style.css';
import { getWeather } from './weatherAPI.js';

const currentWeather = (city, oneCall) => {
  console.log(oneCall)
  console.log(city)

  const overallWeather = document.getElementById("currentWeather");
  if (oneCall.current.weather[0].id == 803) {
    overallWeather.classList.add("thunderstorm");
  }

//   // localStorage.setItem("weatherObj", JSON.stringify(oneCall));
//   // const workingWeatherObj = JSON.parse(localStorage.getItem("weatherObj"));
//   // console.log(workingWeatherObj)
//   // console.log(oneCall)

//   // console.log(oneCall.current.temp) //curent temp
//   // console.log(oneCall.current.feels_like) //feels like

  const windSpeed = oneCall.current.wind_speed; //wind speed
  const windGusts = oneCall.current.wind_gust; //wind gust

  let num = oneCall.current.wind_deg

  function degToCompass(num) {
    var val = Math.floor((num / 22.5) + 0.5);
    var arr = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
    return arr[(val % 16)];
  }

  const windDirection = degToCompass(num);

  const wind = `${windDirection} @ ${windSpeed} km/hr`;

  console.log(`${windDirection} @ ${windSpeed}km/hr. Gusting at ${windGusts}km/hr`)

//   // console.log(oneCall.current.visibility) // visibility
//   // console.log(oneCall.current.weather[0].description) // visibility

  const userCity = document.getElementById("city");
  userCity.innerText = city;

  const currentTemp = document.getElementById("temp");
  currentTemp.innerText = Math.round(oneCall.current.temp);

  const currentWeath = document.getElementById("current");
  currentWeath.innerText = oneCall.current.weather[0].description;

  const currentWind = document.getElementById("wind");
  currentWind.innerText = wind;

  if (oneCall.alerts != null) {
    const warning = document.createElement("div");
    warning.classList.add("warning");
    warning.innerText = `${oneCall.alerts[0].event}`;
    const container = document.getElementById("currentWeather");
    container.append(warning);
  }

  const sun = new Date(oneCall.current.sunset *1000);
  const sunsetTime = sun.toLocaleTimeString();
  const sunset = document.getElementById("sunset");
  sunset.innerText = `The sun will set at ${sunsetTime}`;
  


}


export { currentWeather }
