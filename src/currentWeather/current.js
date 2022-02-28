import windy from './assets/windy.png';
import format from 'date-fns/format'

const currentWeatherSection = (today) => {

  const overallWeather = document.querySelector(".currentWeather");
  overallWeather.removeAttribute("class");
  overallWeather.classList.add("currentWeather");
  overallWeather.classList.add(`${today.weatherid()}${today.nightOrDay()}`);

  // Date
  const date = document.getElementById("date");
  date.innerText = today.todaysDate(today.currentTime);

  // City
  const userCity = document.getElementById("city");
  userCity.innerText = `${today.city}, ${today.country}`;

  // Current temp
  const currentTemp = document.getElementById("temp");
  currentTemp.innerHTML = `${Math.round(today.temperature)}<span>&#8451;</span>`;

  // Daily High and low
  const min = document.getElementById("min");
  const max = document.getElementById("max");
  min.innerText = today.low;
  max.innerText = today.high;

  const currentWind1 = document.getElementById("wind");
  currentWind1.innerHTML='';
  const windIcon = new Image();
  windIcon.src = windy;
  windIcon.alt = "Wind Icon";
  
  const currentWind = document.createElement("span");
  currentWind.id = "windSpan";
  currentWind.innerText = today.windDesc();
  currentWind1.append(windIcon, currentWind);

  // Current weather description
  const currentWeath = document.getElementById("current");
  currentWeath.innerText = `Currently ${today.description}`;

  // Feels like temp
  const feelsLike = document.getElementById("flSpan");
  feelsLike.innerHTML = `${Math.round(today.feelsLike)}&#8451;`;

  // UV index
  const uvIndex = document.getElementById("uvSpan");
  uvIndex.innerText = today.uvIndex;

  // Visibility
  const visibility = document.getElementById("vSpan");
  visibility.innerHTML = `${today.visibility}m`

  // Humidity
  const humidity = document.getElementById("humSpan");
  humidity.innerText = `${today.humidity}%`

  const sunriseEl = document.getElementById("srSpan");
  sunriseEl.innerText = today.sunRise();

  const sunsetEl = document.getElementById("ssSpan");
  sunsetEl.innerText = today.sunSet();

}

export { currentWeatherSection }