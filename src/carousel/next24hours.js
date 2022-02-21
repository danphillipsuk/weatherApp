import format from 'date-fns/format'

const next24hours = (todaysWeather, data, offset) => {

  console.log(data)

  function convertToAMPM (num, offset) {
    const rawtime = num + offset;
    const newtime = new Date(rawtime * 1000);
    const finalTime = format((newtime), 'h a');
    return finalTime;
  }

  function determineNightorDay (num) {
    let final;
    const todaysSunset = todaysWeather.sunset;
    const tomorrowSunrise = todaysWeather.tomorrowSunrise;
    if (num < todaysSunset || num > tomorrowSunrise) {
      final = "Day";
    } else {
      final = "Night";
    }
    return final;
  }


  data.slice(1,25).forEach((item,index) => {

    const time = convertToAMPM (item.dt, offset);
    const day = determineNightorDay(item.dt);

    const singleHour = document.createElement("li");
    singleHour.innerHTML = `
      <span class="time">${time}</span>
      <span class="temp">${Math.round(data[index+1].temp)}&#8451;</span>
      <span class="desc">${data[index+1].weather[0].description}</span>`;

      const weatherID = data[index+1].weather[0].id;
      if (weatherID >= 200 && weatherID <= 232) {
        singleHour.classList.add(`thunderstorm${day}`);
      } else if (weatherID >= 300 && weatherID <= 321 || weatherID >= 520 && weatherID <= 531 ) {
        singleHour.classList.add(`drizzle${day}`);
      } else if (weatherID >= 500 && weatherID <= 504) {
        singleHour.classList.add(`rain${day}`)
      } else if (weatherID >= 600 && weatherID <= 622 || weatherID == 511) {
        singleHour.classList.add(`snow${day}`)
      } else if (weatherID >= 701 && weatherID <= 781) {
        singleHour.classList.add(`atmosphere${day}`)
      } else if (weatherID === 800) {
        singleHour.classList.add(`clear${day}`)
      } else if (weatherID === 801) {
        singleHour.classList.add(`clouds1${day}`)
      } else if (weatherID === 802) {
        singleHour.classList.add(`clouds2${day}`)
      } else if (weatherID >= 803 && weatherID <= 804) {
        singleHour.classList.add(`clouds3${day}`)
      }

    

    const poop = document.getElementById("hourlyContainer");
    poop.append(singleHour);

  })

  const hourly = document.getElementById("hourlyContainer");
  const daily = document.getElementById("dailyContainer");
  const hourButton = document.getElementById("hourButton");
  const dayButton = document.getElementById("dayButton");

  document.getElementById('dayButton').addEventListener("click", () => {
    hourly.style.display ="none";
    daily.style.display = "flex";
    dayButton.classList.add("active");
    hourButton.classList.remove("active");
  })

  document.getElementById('hourButton').addEventListener("click", () => {
    hourly.style.display ="flex";
    daily.style.display = "none";
    dayButton.classList.remove("active");
    hourButton.classList.add("active");
  
  })

}

export { next24hours }