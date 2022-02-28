const sevenDays = (weatherData) => {

  const daily = weatherData.dailyArray;

  let parent = document.getElementById("dailyContainer");
  parent.innerHTML='';

  daily.forEach((item, index) => {

    if (index > 0) {  
  
      const singleDay = document.createElement("li");
      singleDay.innerHTML = `
      <span>${weatherData.dayFromSeconds(daily[index].dt)}</span>
      <span>${weatherData.dateFromSeconds(daily[index].dt)}</span>
      <span>${Math.round(daily[index].temp.day)}&#8451;</span>
      <span>${daily[index].weather[0].description}</span>`;

      singleDay.classList.add(`${weatherData.hourlyWeatherId(daily[index].weather[0].id)}`);
  
      const dailyContainer = document.getElementById("dailyContainer");
      dailyContainer.appendChild(singleDay);

    }

  })

}

export { sevenDays }