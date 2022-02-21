import format from 'date-fns/format'
import windy from './assets/windy.png';
import { timingCalcs, windDesc } from './functions';
import { getWeather } from '../weatherAPI';

const currentWeatherSection = () => {
  
  const todaysWeather = JSON.parse(localStorage.getItem("todaysForecast"));
  const dayOrNight = timingCalcs().dayOrNight;
  const timeToSun = timingCalcs().timeToSun;


  const overallContent = document.getElementById("content");
  const overallWeather = document.getElementById("currentWeather");
  const weatherID = todaysWeather.weatherID;

  if (weatherID >= 200 && weatherID <= 232) {
    overallWeather.classList.add(`thunderstorm${dayOrNight}`);
  } else if (weatherID >= 300 && weatherID <= 321 || weatherID >= 520 && weatherID <= 531 ) {
    overallWeather.classList.add(`drizzle${dayOrNight}`);
  } else if (weatherID >= 500 && weatherID <= 504) {
    overallWeather.classList.add(`rain${dayOrNight}`)
  } else if (weatherID >= 600 && weatherID <= 622 || weatherID == 511) {
    overallWeather.classList.add(`snow${dayOrNight}`)
  } else if (weatherID >= 701 && weatherID <= 781) {
    overallWeather.classList.add(`atmosphere${dayOrNight}`)
  } else if (weatherID === 800) {
    overallWeather.classList.add(`clear${dayOrNight}`)
  } else if (weatherID === 801) {
    overallWeather.classList.add(`clouds1${dayOrNight}`)
  } else if (weatherID === 802) {
    overallWeather.classList.add(`clouds2${dayOrNight}`)
  } else if (weatherID >= 803 && weatherID <= 804) {
    overallWeather.classList.add(`clouds3${dayOrNight}`)
  }

  if (dayOrNight === 'Night') {
    overallContent.classList.add("night")
  } else
  if (todaysWeather.temperature < 4 && weatherID === 800) {
    overallContent.classList.add("coldAndClear")
  } else if (todaysWeather.temperature > 4 && weatherID === 800) {
    overallContent.classList.add("warmAndClear")
  } else if (weatherID > 800 || weatherID < 800) {
    overallContent.classList.add("cloudy")
  }

  // Date
  // const today = format(todaysDate, 'eeee do LLLL yyyy');
  // const date = document.getElementById("date");
  // date.innerText = today;

  // City
  const userCity = document.getElementById("city");
  userCity.innerText = `${todaysWeather.city}, ${todaysWeather.country}`;

  // Current temp
  const currentTemp = document.getElementById("temp");
  currentTemp.innerHTML = `${Math.round(todaysWeather.temperature)}<span>&#8451;</span>`;

  // Daily High and low
  const min = document.getElementById("min");
  const max = document.getElementById("max");
  min.innerText = todaysWeather.low;
  max.innerText = todaysWeather.high;

  const windIcon = new Image();
  windIcon.src = windy;
  windIcon.alt = "Wind Icon";
  const currentWind1 = document.getElementById("wind");

  const currentWind = document.getElementById("windSpan");
  currentWind.innerText = windDesc();
  currentWind1.prepend(windIcon);

  // Current weather description
  const currentWeath = document.getElementById("current");
  currentWeath.innerText = todaysWeather.description;

  // Feels like temp
  const feelsLike = document.getElementById("flSpan");
  feelsLike.innerHTML = `${Math.round(todaysWeather.feelsLike)}&#8451;`;

  // UV index
  const uvIndex = document.getElementById("uvSpan");
  uvIndex.innerText = todaysWeather.uvIndex;

  // Visibility
  const visibility = document.getElementById("vSpan");
  visibility.innerHTML = `${todaysWeather.visibility}m`

  // Humidity
  const humidity = document.getElementById("humSpan");
  humidity.innerHTML = `${todaysWeather.humidity}%`

  // Time until sunrise or sunset
  const sunAction = document.getElementById("timeToSun");
  sunAction.innerText = timeToSun;

}

export { currentWeatherSection }