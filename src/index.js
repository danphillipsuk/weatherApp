import _ from 'lodash';
import './style.css';
import { currentWeatherSection } from './currentWeather/current';
import { next24hours } from './carousel/next24hours';
import { sevenDays } from './carousel/nextSevenDays';

const buildApp = (todaysForecast, hourly, daily) => {

  // const buildApp = () => {  
  //   const todaysForecast = JSON.parse(localStorage.getItem("today"));
  //   const hourly = JSON.parse(localStorage.getItem("hours"));
  //   const daily = JSON.parse(localStorage.getItem("sevendays"));
    
  console.log("buildApp")

  currentWeatherSection(todaysForecast);
  sevenDays(daily);
  next24hours(hourly, todaysForecast);

}

// buildApp();




export { buildApp }
