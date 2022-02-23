import { dayFromSeconds } from '../currentWeather/functions';

const sevenDays = (daily) => {

  function empty(element) {
    while(element.firstElementChild) {
      element.firstElementChild.remove();
    }
  }
  let parent = document.getElementById("dailyContainer");
empty(parent);
  
  // const daily = JSON.parse(localStorage.getItem("sevendays"));

  daily.forEach((item, index) => {

    if (index > 0) {  

      const day = (dayFromSeconds(daily[index].dt));

      const singleDay = document.createElement("li");
      singleDay.innerHTML = `<span class="sevenday_1">${day}</span><span class="sevenday_2">${Math.round(daily[index].temp.day)}&#8451;</span><span class="sevenday_3">${daily[index].weather[0].description}</span>`;

        const weatherID = daily[index].weather[0].id;
        if (weatherID >= 200 && weatherID <= 232) {
          singleDay.classList.add(`thunderstorm`);
        } else if (weatherID >= 300 && weatherID <= 321 || weatherID >= 520 && weatherID <= 531 ) {
          singleDay.classList.add(`drizzle`);
        } else if (weatherID >= 500 && weatherID <= 504) {
          singleDay.classList.add(`rain`)
        } else if (weatherID >= 600 && weatherID <= 622 || weatherID == 511) {
          singleDay.classList.add(`snow`)
        } else if (weatherID >= 701 && weatherID <= 781) {
          singleDay.classList.add(`atmosphere`)
        } else if (weatherID === 800) {
          singleDay.classList.add(`clear`)
        } else if (weatherID === 801) {
          singleDay.classList.add(`clouds1`)
        } else if (weatherID === 802) {
          singleDay.classList.add(`clouds2`)
        } else if (weatherID >= 803 && weatherID <= 804) {
          singleDay.classList.add(`clouds3`)
        }
      
      const dailyContainer = document.getElementById("dailyContainer");
      dailyContainer.appendChild(singleDay);

    }

  })

}



export { sevenDays }