import format from 'date-fns/format'
import windy from './windy.png';
import { getWeather } from '../weatherAPI';

const currentWeatherSection = (oneCall, city, country) => {

  // Get todays date/time for page calculations
  const todaysDate = new Date();

  // Convert time to 10 digits to match API format and ascertain if its currently day or night
  let time = todaysDate.getTime();
  const rtime = Math.floor(time/1000); 
  let dayOrNight;
  if (rtime > oneCall.current.sunrise && rtime < oneCall.current.sunset) {
    dayOrNight = 'Day';
  } else {
    dayOrNight = 'Night';
  }









  // Produce time to sunrise/sunset string
  let timeToSun;

  if (dayOrNight === "Day") {
    const until = oneCall.current.sunset - rtime;
    const hours = Math.floor(until/3600);
    const minutes = Math.floor(until % 3600 / 60);
    const timeOffsetS = oneCall.current.sunset + oneCall.timezone_offset ;
    const sunS = new Date(timeOffsetS *1000);

    const readableTime = format(sunS, 'HH:m');

    if (hours === 0) {
      timeToSun = `The sun will set in ${minutes} minutes at ${readableTime} pm.`
    } else if (hours === 1) {
      timeToSun = `The sun will set in ${hours} hour & ${minutes} minutes at ${readableTime} pm.`
    } else {
      timeToSun = `The sun will set in ${hours} hours & ${minutes} minutes at ${readableTime} pm.`
    }





  } else {
    const until = oneCall.current.sunrise - rtime;
    let hours = Math.floor(until/3600);
    let minutes = Math.floor(until % 3600 / 60);
    const timeOffsetR = oneCall.current.sunrise + oneCall.timezone_offset ;
    const sunR = new Date(timeOffsetR *1000);
    const readableTime = format(sunR, 'HH:m');
    if (hours < 0) { hours += 24; };
    if (hours === 0) {
      timeToSun = `The sun will rise in ${minutes} minutes at ${readableTime} am.`
    } else if (hours === 1) {
      timeToSun = `The sun will rise in ${hours} hour & ${minutes} minutes at ${readableTime} am.`
    } else {
      timeToSun = `The sun will rise in ${hours} hours & ${minutes} minutes at ${readableTime} am.`
    }


  }




























  const overallContent = document.getElementById("content");
  const overallWeather = document.getElementById("currentWeather");
  const weatherID = oneCall.current.weather[0].id;

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
  if (oneCall.current.temp < 4 && weatherID === 800) {
    overallContent.classList.add("coldAndClear")
  } else if (oneCall.current.temp > 4 && weatherID === 800) {
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
  userCity.innerText = `${city}, ${country}`;

  // Current temp
  const currentTemp = document.getElementById("temp");
  const temp = Math.round(oneCall.current.temp);
  currentTemp.innerHTML = `${temp}<span>&#8451;</span>`;

  // Current weather description
  const currentWeath = document.getElementById("current");
  currentWeath.innerText = oneCall.current.weather[0].description;

  // Wind speed, direction and gusts
  let num = oneCall.current.wind_deg

  function degToCompass(num) {
    var val = Math.floor((num / 22.5) + 0.5);
    var arr = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
    return arr[(val % 16)];
  }
  const windDirection = degToCompass(num);
  const windSpeed = oneCall.current.wind_speed;
  const windGusts = oneCall.current.wind_gust; 
  let wind = '';
  if (typeof windGusts == 'undefined') {
    wind = `${windDirection} at ${windSpeed} km/hr`;
  } else {
    wind = `${windDirection} at ${windSpeed} km/hr. Gusts at ${windGusts}km/hr`;
  }
  const windIcon = new Image();
  windIcon.src = windy;
  windIcon.alt = "Wind Icon";
  const currentWind1 = document.getElementById("wind");

  const currentWind = document.getElementById("windSpan");
  currentWind.innerText = wind;
  currentWind1.prepend(windIcon);

  // Feels like temp
  const feelsLike = document.getElementById("flSpan");
  feelsLike.innerHTML = `${Math.round(oneCall.current.feels_like)}&#8451;`;

  // UV index
  const uvIndex = document.getElementById("uvSpan");
  uvIndex.innerText = oneCall.current.uvi;

  // Visibility
  const visibility = document.getElementById("vSpan");
  visibility.innerHTML = `${oneCall.current.visibility}m`

  // Humidity
  const humidity = document.getElementById("humSpan");
  humidity.innerHTML = `${oneCall.current.humidity}%`

  // Time until sunrise or sunset
  const sunAction = document.getElementById("timeToSun");
  sunAction.innerText = timeToSun;

  // Sunrise & Sunset
  // const timeOffsetR = oneCall.current.sunrise + oneCall.timezone_offset ;
  // const sunR = new Date(timeOffsetR *1000);
  // const sunriseTime = sunR.toLocaleTimeString();
  // const sunrise = document.getElementById("srSpan");
  // sunrise.innerText = `${sunriseTime}`;

  // const timeOffsetS = oneCall.current.sunset + oneCall.timezone_offset ;
  // const sunS = new Date(timeOffsetS *1000);
  // const sunsetTime = sunS.toLocaleTimeString();
  // const sunset = document.getElementById("ssSpan");
  // sunset.innerText = `${sunsetTime}`;




  // Weather alerts
  if (oneCall.alerts != null) {
    const warning = document.createElement("div");
    warning.classList.add("warning");
    warning.innerText = `${oneCall.alerts[0].event}`;
    const container = document.getElementById("currentWeather");
    // container.append(warning);
  }

}

export { currentWeatherSection }