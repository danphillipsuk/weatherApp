import format from 'date-fns/format'

class WeatherClass {

  constructor(currentTime, city, country, weatherID, description, temperature, high, low, feelsLike, humidity, uvIndex, visibility, sunrise, sunset, timezone, windDeg, windSpeed, windGust, hourlyArray, dailyArray) {
    this.currentTime = currentTime;
    this.city = city; 
    this.country = country;
    this.weatherID = weatherID;
    this.description = description;
    this.temperature = temperature;
    this.high = high;
    this.low = low;
    this.feelsLike = feelsLike;
    this.humidity = humidity;
    this.uvIndex = uvIndex;
    this.visibility = visibility;
    this.sunrise = sunrise;
    this.sunset = sunset;
    this.timezone = timezone;
    this.windDeg = windDeg;
    this.windSpeed = windSpeed;
    this.windGust = windGust;
    this.hourlyArray = hourlyArray;
    this.dailyArray = dailyArray;
  }

  // Calculate local sunrise time
  sunRise () {
    const newtime = new Date((this.sunrise + this.timezone) * 1000);
    const finalTime = format((newtime), 'h:mm a');
    return finalTime;
  }

  // Calculate local sunset time
  sunSet () {
    const newtime = new Date((this.sunset + this.timezone) * 1000);
    const finalTime = format((newtime), 'h:mm a');
    return finalTime;
  }

  // Determine whether it is day or night at chosen location
  nightOrDay () {
    const todaysDate = new Date();
    let result, currentTime, time;
    // Convert time to 10 digits to match API format and ascertain if its currently day or night
    time = todaysDate.getTime();
    currentTime = Math.floor(time/1000); 
    if (currentTime > this.sunrise && currentTime < this.sunset) {
      result = 'Day';
    } else {
      result = 'Night';
    } 
    return result;
  }

  // Calculate wind direction, speed and gusts
  windDesc () {
    let num = this.windDeg;

    function degToCompass(num) {
      var val = Math.floor((num / 22.5) + 0.5);
      var arr = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
      return arr[(val % 16)];
    }

    const windDirection = degToCompass(num);
    const windSpeed = this.windSpeed;
    const windGusts = this.windGust; 
    let wind = '';
    if (typeof windGusts == 'undefined') {
      wind = `${windDirection} at ${windSpeed} km/hr`;
    } else {
      wind = `${windDirection} at ${windSpeed} km/h. Gusts at ${windGusts}km/h`;
    }
    return wind;
  }

  // Determine weather ID to serve correct icon on main display
  weatherid () {
    if (this.weatherID >= 200 && this.weatherID <= 232) { return 'thunderstorms'; }
    else if (this.weatherID >= 300 && this.weatherID <= 321 || this.weatherID >= 520 && this.weatherID <= 531 ) { return 'drizzle'; }
    else if (this.weatherID >= 500 && this.weatherID <= 504) { return 'rain'; }
    else if (this.weatherID >= 600 && this.weatherID <= 622 || this.weatherID == 511) { return 'snow'; }
    else if (this.weatherID >= 701 && this.weatherID <= 781) { return 'atmosphere'; }
    else if (this.weatherID === 800) { return 'clear'; }
    else if (this.weatherID === 801) { return 'clouds1'; }
    else if (this.weatherID === 802) { return 'clouds2'; }
    else if (this.weatherID >= 803 && this.weatherID <= 804) { return 'clouds3'; }
  }

  // Methods for 24 hour and daily weather section
  twentyFourHourTabs (num) {
    const rawTime = this.hourlyArray[1].dt + this.timezone + num;
    const newTime = new Date(rawTime * 1000);
    const finalTime = format((newTime), 'ha');
    return finalTime;
  }

  localHourlyHeadings (num) {
    const rawtime = num + this.timezone;
    const newtime = new Date(rawtime * 1000);
    const finalTime = format((newtime), 'ha');
    return finalTime;
  }

  hourlyWeatherId (num) {
    if (num >= 200 && num <= 232) { return 'thunderstorms'; }
    else if (num >= 300 && num <= 321 || num >= 520 && num <= 531 ) { return 'drizzle'; }
    else if (num >= 500 && num <= 504) { return 'rain'; }
    else if (num >= 600 && num <= 622 || num == 511) { return 'snow'; }
    else if (num >= 701 && num <= 781) { return 'atmosphere'; }
    else if (num === 800) { return 'clear'; }
    else if (num === 801) { return 'clouds1'; }
    else if (num === 802) { return 'clouds2'; }
    else if (num >= 803 && num <= 804) { return 'clouds3'; }
  }

  dayFromSeconds (num) {
    const readableDay = new Date(num * 1000);
    const readableDate = format(new Date(readableDay), 'do MMM');
    const displayDay = format(new Date(readableDay), 'EEEE');
    return displayDay;
  }

  dateFromSeconds (num) {
    const readableDay = new Date(num * 1000);
    const readableDate = format(new Date(readableDay), 'do MMM');
    return readableDate;
  }

  todaysDate (num) {
    const readableDay = new Date((num + this.timezone) * 1000);
    const readableDate = format(new Date(readableDay), 'h:mm aaa EEEE do MMMM yyyy');
    return readableDate;
  }

}

export { WeatherClass }