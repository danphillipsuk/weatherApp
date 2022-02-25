const sevenDays = (weatherData) => {

  const daily = weatherData.dailyArray;

  let parent = document.getElementById("dailyContainer");
  parent.innerHTML='';

  daily.forEach((item, index) => {

    if (index > 0) {  
  
      const day = (weatherData.dayFromSeconds(daily[index].dt));

      const singleDay = document.createElement("li");
      singleDay.innerHTML = `
      <span class="sevenday_1">${day}</span>
      <span class="sevenday_2">${Math.round(daily[index].temp.day)}&#8451;</span>
      <span class="sevenday_3">${daily[index].weather[0].description}</span>`;

      singleDay.classList.add(`${weatherData.hourlyWeatherId(daily[index].weather[0].id)}`);
  
      const dailyContainer = document.getElementById("dailyContainer");
      dailyContainer.appendChild(singleDay);

    }

  })

}

export { sevenDays }