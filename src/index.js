import _ from 'lodash';
import './style.css';
import { currentWeatherSection } from './currentWeather/current';
import { next24hours } from './carousel/next24hours';
import { sevenDays } from './carousel/sevenDays';

const buildApp = (todaysForecast, hourly, daily) => {

  // const buildApp = () => {  
  //   const todaysForecast = JSON.parse(localStorage.getItem("today"));
  //   const hourly = JSON.parse(localStorage.getItem("hours"));
  //   const daily = JSON.parse(localStorage.getItem("sevendays"));
    
  function empty(element) {
    while(element.firstElementChild) {
      element.firstElementChild.remove();
    }
  }
  let parent = document.getElementById("firstSlide");
  empty(parent);

  currentWeatherSection(todaysForecast);
  next24hours(hourly, todaysForecast);
  sevenDays(daily);

}

// buildApp();




export { buildApp }
