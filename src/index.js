import _ from 'lodash';
import './style.css';
import { currentWeatherSection } from './currentWeather/current';
import { next24hours } from './carousel/next24hours';
import { sevenDays } from './carousel/nextSevenDays';

const buildApp = (weatherData) => {

  currentWeatherSection(weatherData);
  sevenDays(weatherData);
  next24hours(weatherData);

}


export { buildApp }
