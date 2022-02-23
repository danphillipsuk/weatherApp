import format from 'date-fns/format'

const next24hours = (data, offsetStore) => {



  // const data = JSON.parse(localStorage.getItem("hours"));
  // const offsetStore = JSON.parse(localStorage.getItem("today"));
  const offset = offsetStore.timezone;


  const one = convertToAMPM(data[1].dt, offset);
  const two = convertToAMPM(data[1].dt + 25200, offset);
  const three = convertToAMPM(data[1].dt + 28800, offset);
  const four = convertToAMPM(data[1].dt + 54000, offset);
  const five = convertToAMPM(data[1].dt + 57600, offset);
  const six = convertToAMPM(data[1].dt + 82800, offset);

  

  const firstTab = `${one} - ${two}`;
  const secondTab = `${three} - ${four}`;
  const thirdTab = `${five} - ${six}`;


  const firstTabInsert = document.getElementById("firstSlide");
  firstTabInsert.innerText = firstTab;
  const secondTabInsert = document.getElementById("secondSlide");
  secondTabInsert.innerText = secondTab;
  const thirdTabInsert = document.getElementById("thirdSlide");
  thirdTabInsert.innerText = thirdTab;







  function convertToAMPM (num, offset) {
    const rawtime = num + offset;
    const newtime = new Date(rawtime * 1000);
    const finalTime = format((newtime), 'ha');
    return finalTime;
  }

  function eightHourBlock (start, finish, index1) {
    const eightHourContainer = document.createElement("div");
    eightHourContainer.classList.add("slide");
    eightHourContainer.id=`slide${index1}`;
    
  
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

  // let parent = document.getElementById("slide1");
  
  // function empty(element) {
  //   while(element.firstElementChild) {
  //     element.firstElementChild.remove();
  //   }
  // }
  // if (parent) {
  // empty(parent);
  // }
  eightHourBlock(1,9, 1);
  eightHourBlock(9,17, 9);
  eightHourBlock(17,25, 17);

  
  let slideIndex = 1;
  showSlides(slideIndex);
  function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("slide");
    let dots = document.getElementsByClassName("dot");
    if (n > slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex-1].style.display = "flex";
    dots[slideIndex-1].className += " active";
  } 


  document.getElementById('firstSlide').addEventListener("click", () => {
    showSlides(slideIndex = 1);
  })

  document.getElementById('secondSlide').addEventListener("click", () => {
    showSlides(slideIndex = 2);
  })

  document.getElementById('thirdSlide').addEventListener("click", () => {
    showSlides(slideIndex = 3);
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