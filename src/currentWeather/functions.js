import format from 'date-fns/format'


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

  return { dayOrNight }
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