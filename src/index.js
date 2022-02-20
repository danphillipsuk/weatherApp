import _ from 'lodash';
import './style.css';
import { currentWeatherSection } from './currentWeather/current';

const currentWeather = (city, oneCall, country) => {

  currentWeatherSection(oneCall, city, country);

}


export { currentWeather }
