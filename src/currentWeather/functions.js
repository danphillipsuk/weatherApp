import format from 'date-fns/format'

// const todaysWeather = JSON.parse(localStorage.getItem("todaysForecast"));

function timingCalcs (todaysWeather) {

  // Get todays date/time
  const todaysDate = new Date();
  let dayOrNight, currentTime, timeToSun, time;
  // Convert time to 10 digits to match API format and ascertain if its currently day or night
  time = todaysDate.getTime();
  currentTime = Math.floor(time/1000); 
  if (currentTime > todaysWeather.sunrise && currentTime < todaysWeather.sunset) {
    dayOrNight = 'Day';
  } else {
    dayOrNight = 'Night';
  } 

  // Produce time to sunrise/sunset string
  if (dayOrNight === "Day") {
    const until = todaysWeather.sunset - currentTime;
    const hours = Math.floor(until/3600);
    const minutes = Math.floor(until % 3600 / 60);
    const timeOffsetS = todaysWeather.sunset + todaysWeather.timezone ;
    const sunS = new Date(timeOffsetS *1000);

    const readableTime = format(sunS, 'HH:mm');

    if (hours === 0) {
      timeToSun = `The sun will set in ${minutes} minutes at ${readableTime} pm.`
    } else if (hours === 1) {
      timeToSun = `The sun will set in ${hours} hour & ${minutes} minutes at ${readableTime} pm.`
    } else {
      timeToSun = `The sun will set in ${hours} hours & ${minutes} minutes at ${readableTime} pm.`
    }

  } else {
    const until = todaysWeather.tomorrowSunrise - currentTime;
    let hours = Math.floor(until/3600);
    let minutes = Math.floor(until % 3600 / 60);
    const timeOffsetR = todaysWeather.tomorrowSunrise + todaysWeather.timezone ;
    const sunR = new Date(timeOffsetR *1000);
    const readableTime = format(sunR, 'HH:mm');

    if (hours === 0) {
      timeToSun = `The sun will rise in ${minutes} minutes at ${readableTime} am.`
    } else if (hours === 1) {
      timeToSun = `The sun will rise in ${hours} hour & ${minutes} minutes at ${readableTime} am.`
    } else {
      timeToSun = `The sun will rise in ${hours} hours & ${minutes} minutes at ${readableTime} am.`
    }
  }
  return { dayOrNight, timeToSun }
}

function windDesc (todaysWeather) {
  // Wind speed, direction and gusts
  let num = todaysWeather.windDeg;

  function degToCompass(num) {
    var val = Math.floor((num / 22.5) + 0.5);
    var arr = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
    return arr[(val % 16)];
  }
  const windDirection = degToCompass(num);
  const windSpeed = todaysWeather.windSpeed;
  const windGusts = todaysWeather.windGust; 
  let wind = '';
  if (typeof windGusts == 'undefined') {
    wind = `${windDirection} at ${windSpeed} km/hr`;
  } else {
    wind = `${windDirection} at ${windSpeed} km/hr. Gusts at ${windGusts}km/hr`;
  }
  return wind;
}


export { timingCalcs, windDesc }