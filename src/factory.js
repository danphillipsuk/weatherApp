import { buildApp } from './index.js';
import format from 'date-fns/format'
import { hi, hu } from 'date-fns/locale';
import { WeatherClass }  from './weatherClass';

function construct (today, oneCall) {

  const weatherFactory = (
    city, country, weatherID, description, temperature, high, low, feelsLike, humidity, uvIndex, visibility, sunrise, sunset, timezone, tomorrowSunrise, windDeg, windSpeed, windGust ) => {

      const sunTimes = (sunrise, timezone) => {
        const newtime = new Date((sunrise + timezone) * 1000);
        const finalTime = format((newtime), 'h:mm a');
        return finalTime;
      }



      return { city, country, weatherID, description, temperature, high, low, feelsLike, humidity, uvIndex, visibility, sunrise, sunset, timezone, tomorrowSunrise, windDeg, windSpeed, windGust,
        sunTimes };
  }

  let todaysForecast, hourlyArray, dailyArray;

  todaysForecast = weatherFactory(today.name, today.sys.country, oneCall.current.weather[0].id, oneCall.current.weather[0].description, oneCall.current.temp, oneCall.daily[0].temp.max, oneCall.daily[0].temp.min,
    oneCall.current.feels_like, oneCall.current.humidity, oneCall.current.uvi, oneCall.current.visibility, oneCall.current.sunrise, oneCall.current.sunset, oneCall.timezone_offset, oneCall.daily[1].sunrise, oneCall.current.wind_deg, oneCall.current.wind_speed, oneCall.current.wind_gust);

    hourlyArray = oneCall.hourly;
    dailyArray = oneCall.daily;

    const sunrise = todaysForecast.sunTimes(todaysForecast.sunrise, todaysForecast.timezone);
    const sunset = todaysForecast.sunTimes(todaysForecast.sunset, todaysForecast.timezone);



  const weatherData = new WeatherClass (today.name, today.sys.country, oneCall.current.weather[0].id, oneCall.current.weather[0].description, oneCall.current.temp, oneCall.daily[0].temp.max, oneCall.daily[0].temp.min,
    oneCall.current.feels_like, oneCall.current.humidity, oneCall.current.uvi, oneCall.current.visibility, oneCall.current.sunrise, oneCall.current.sunset, oneCall.timezone_offset, oneCall.current.wind_deg, oneCall.current.wind_speed, oneCall.current.wind_gust, oneCall.hourly);






    buildApp(todaysForecast, hourlyArray, dailyArray, weatherData);

}















// class WeatherClass {

//   constructor(city, country, weatherID, description, temperature, high, low, feelsLike, humidity, uvIndex, visibility, sunrise, sunset, timezone, windDeg, windSpeed, windGust) {
//     this.city = city; 
//     this.country = country;
//     this.weatherID = weatherID;
//     this.description = description;
//     this.temperature = temperature;
//     this.high = high;
//     this.low = low;
//     this.feelsLike = feelsLike;
//     this.humidity = humidity;
//     this.uvIndex = uvIndex;
//     this.visibility = visibility;
//     this.sunrise = sunrise;
//     this.sunset = sunset;
//     this.timezone = timezone;
//     this.windDeg = windDeg;
//     this.windSpeed = windSpeed;
//     this.windGust = windGust;
//   }

//   sunRise() {
//     const newtime = new Date((this.sunrise + this.timezone) * 1000);
//     const finalTime = format((newtime), 'h:mm a');
//     return finalTime;
//   }

//   sunSet() {
//     const newtime = new Date((this.sunset + this.timezone) * 1000);
//     const finalTime = format((newtime), 'h:mm a');
//     return finalTime;
//   }

// }

export { construct }

