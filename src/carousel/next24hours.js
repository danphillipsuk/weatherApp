import { convertToAMPM, initiateSlides } from '../currentWeather/functions';

const next24hours = (data, offsetStore) => {
  // const data = JSON.parse(localStorage.getItem("hours"));
  // const offsetStore = JSON.parse(localStorage.getItem("today"));
  const offset = offsetStore.timezone;

  // 24 hour tabbed menu hours 
  const one = convertToAMPM(data[1].dt, offset);
  const two = convertToAMPM(data[1].dt + 25200, offset);
  const three = convertToAMPM(data[1].dt + 28800, offset);
  const four = convertToAMPM(data[1].dt + 54000, offset);
  const five = convertToAMPM(data[1].dt + 57600, offset);
  const six = convertToAMPM(data[1].dt + 82800, offset);
  const firstTabInsert = document.getElementById("firstSlide");
  firstTabInsert.innerText = `${one} - ${two}`;
  const secondTabInsert = document.getElementById("secondSlide");
  secondTabInsert.innerText = `${three} - ${four}`;
  const thirdTabInsert = document.getElementById("thirdSlide");
  thirdTabInsert.innerText = `${five} - ${six}`;

  // create slides with weather data for eight hour blocks
  function eightHourBlock (start, finish, index1) {

    const eightHourContainer = document.getElementById(`slide${index1}`);
    eightHourContainer.innerHTML = "";

    data.slice(start, finish).forEach((item, index) => {
      const time = convertToAMPM (item.dt, offset);
      const relIndex = index1 + index;
  
      const singleHour = document.createElement("li");
    
      singleHour.innerHTML = `
        <span class="time">${time}</span>
        <span class="temp">${Math.round(data[relIndex].temp)}&#8451;</span>
        <span class="desc">${data[relIndex].weather[0].description}</span>`;

        const weatherID = data[relIndex].weather[0].id;
        if (weatherID >= 200 && weatherID <= 232) {
          singleHour.classList.add(`thunderstorm`);
        } else if (weatherID >= 300 && weatherID <= 321 || weatherID >= 520 && weatherID <= 531 ) {
          singleHour.classList.add(`drizzle`);
        } else if (weatherID >= 500 && weatherID <= 504) {
          singleHour.classList.add(`rain`)
        } else if (weatherID >= 600 && weatherID <= 622 || weatherID == 511) {
          singleHour.classList.add(`snow`)
        } else if (weatherID >= 701 && weatherID <= 781) {
          singleHour.classList.add(`atmosphere`)
        } else if (weatherID === 800) {
          singleHour.classList.add(`clear`)
        } else if (weatherID === 801) {
          singleHour.classList.add(`clouds1`)
        } else if (weatherID === 802) {
          singleHour.classList.add(`clouds2`)
        } else if (weatherID >= 803 && weatherID <= 804) {
          singleHour.classList.add(`clouds3`)
        }

      eightHourContainer.append(singleHour);
      const poop = document.getElementById("hourlyContainer");
      poop.appendChild(eightHourContainer);
    })
  
  }

  eightHourBlock(1, 9, 1);
  eightHourBlock(9, 17, 9);
  eightHourBlock(17, 25, 17);

  // Call function to build slide switch
  initiateSlides(1);

}

















export { next24hours }