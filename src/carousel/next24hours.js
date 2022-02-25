import { initiateSlides } from '../currentWeather/functions';

const next24hours = (hourlyData) => {

  // 24 hour tabbed menu hours 
  const firstTabInsert = document.getElementById("firstSlide");
  firstTabInsert.innerText = `${hourlyData.twentyFourHourTabs(0)} - ${hourlyData.twentyFourHourTabs(25200)}`;
  const secondTabInsert = document.getElementById("secondSlide");
  secondTabInsert.innerText = `${hourlyData.twentyFourHourTabs(28800)} - ${hourlyData.twentyFourHourTabs(54000)}`;
  const thirdTabInsert = document.getElementById("thirdSlide");
  thirdTabInsert.innerText = `${hourlyData.twentyFourHourTabs(57600)} - ${hourlyData.twentyFourHourTabs(82800)}`;

  // create slides with weather data for eight hour blocks
  function eightHourBlock (start, finish, slideNumber) {

    const eightHourContainer = document.getElementById(`slide${slideNumber}`);
    eightHourContainer.innerHTML = "";

    hourlyData.hourlyArray.slice(start, finish).forEach((item, index) => {

      const relIndex = slideNumber + index;
      const singleHour = document.createElement("li");
      singleHour.classList.add(`${hourlyData.hourlyWeatherId(hourlyData.hourlyArray[relIndex].weather[0].id)}`);
    
      singleHour.innerHTML = `
        <span class="time">${hourlyData.localHourlyHeadings(item.dt)}</span>
        <span class="temp">${Math.round(hourlyData.hourlyArray[relIndex].temp)}&#8451;</span>
        <span class="desc">${hourlyData.hourlyArray[relIndex].weather[0].description}</span>`;

      eightHourContainer.append(singleHour);
      const hourlyContainer = document.getElementById("hourlyContainer");
      hourlyContainer.appendChild(eightHourContainer);
    })
  
  }

  eightHourBlock(1, 9, 1);
  eightHourBlock(9, 17, 9);
  eightHourBlock(17, 25, 17);

  // Call function to build slide switch
  initiateSlides(1);

}

export { next24hours }