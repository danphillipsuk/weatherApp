import _ from 'lodash';
import './style.css';
import { currentWeatherSection } from './currentWeather/current';
import { next24hours } from './carousel/next24hours'

const buildApp = (data, hourlyArray) => {
  
  currentWeatherSection(data);


}


export { buildApp }
