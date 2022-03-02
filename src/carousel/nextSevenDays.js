
const sevenDays = (weatherData) => {

  const daily = weatherData.dailyArray;

  let parent = document.getElementById("dailyContainer");
  parent.innerHTML='';

  daily.forEach((item, index) => {

    if (index > 0) {  
  
      const singleDay = document.createElement("li");
      const date = weatherData.dateFromSeconds(daily[index].dt);
      singleDay.innerHTML = `
      <span>${weatherData.dayFromSeconds(daily[index].dt)}</span>
      <span>${date}</span>
      <span>${Math.round(daily[index].temp.day)}&#8451;</span>
      <span>${daily[index].weather[0].description}</span>`;

      singleDay.classList.add(`${weatherData.hourlyWeatherId(daily[index].weather[0].id)}`);
      singleDay.classList.add("dailyTabs");
      singleDay.value = daily[index].dt;
  
      const dailyContainer = document.getElementById("dailyContainer");
      dailyContainer.appendChild(singleDay);

    }

  })


  const dayEvent = (() => {
    document.querySelectorAll(".dailyTabs").forEach(function (item) {
      item.addEventListener("click", () => {
        console.log(item.value)
      })
    })
  })()





}

export { sevenDays }