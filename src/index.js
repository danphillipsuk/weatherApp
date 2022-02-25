import _ from 'lodash';
import './style.css';
import { currentWeatherSection } from './currentWeather/current';
import { next24hours } from './carousel/next24hours';
import { sevenDays } from './carousel/nextSevenDays';

const buildApp = (weatherData) => {

  // const buildApp = () => {  
  //   const todaysForecast = JSON.parse(localStorage.getItem("today"));
  //   const hourly = JSON.parse(localStorage.getItem("hours"));
  //   const daily = JSON.parse(localStorage.getItem("sevendays"));

  currentWeatherSection(weatherData);
  sevenDays(weatherData);
  next24hours(weatherData);

}

// buildApp();




export { buildApp }
