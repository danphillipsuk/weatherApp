import windy from './assets/windy.png';

const currentWeatherSection = (todaysData) => {
  
  const overallWeather = document.querySelector(".currentWeather");
  overallWeather.removeAttribute("class");
  overallWeather.classList.add("currentWeather");
  overallWeather.classList.add(`${todaysData.weatherid()}${todaysData.nightOrDay()}`);

  // Date
  // const today = format(todaysDate, 'eeee do LLLL yyyy');
  // const date = document.getElementById("date");
  // date.innerText = today;

  // City
  const userCity = document.getElementById("city");
  userCity.innerText = `${todaysData.city}, ${todaysData.country}`;

  // Current temp
  const currentTemp = document.getElementById("temp");
  currentTemp.innerHTML = `${Math.round(todaysData.temperature)}<span>&#8451;</span>`;

  // Daily High and low
  const min = document.getElementById("min");
  const max = document.getElementById("max");
  min.innerText = todaysData.low;
  max.innerText = todaysData.high;

  const currentWind1 = document.getElementById("wind");
  currentWind1.innerHTML='';
  const windIcon = new Image();
  windIcon.src = windy;
  windIcon.alt = "Wind Icon";
  
  const currentWind = document.createElement("span");
  currentWind.id = "windSpan";
  currentWind.innerText = todaysData.windDesc();
  currentWind1.append(windIcon, currentWind);

  // Current weather description
  const currentWeath = document.getElementById("current");
  currentWeath.innerText = `Currently ${todaysData.description}`;

  // Feels like temp
  const feelsLike = document.getElementById("flSpan");
  feelsLike.innerHTML = `${Math.round(todaysData.feelsLike)}&#8451;`;

  // UV index
  const uvIndex = document.getElementById("uvSpan");
  uvIndex.innerText = todaysData.uvIndex;

  // Visibility
  const visibility = document.getElementById("vSpan");
  visibility.innerHTML = `${todaysData.visibility}m`

  // Humidity
  const humidity = document.getElementById("humSpan");
  humidity.innerText = `${todaysData.humidity}%`

  const sunriseEl = document.getElementById("srSpan");
  sunriseEl.innerText = todaysData.sunRise();

  const sunsetEl = document.getElementById("ssSpan");
  sunsetEl.innerText = todaysData.sunSet();

}

export { currentWeatherSection }