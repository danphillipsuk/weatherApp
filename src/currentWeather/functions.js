import format from 'date-fns/format'
import { getWeather } from '../weatherAPI';


// function timingCalcs (todaysWeather) {

//   // Get todays date/time
//   const todaysDate = new Date();
//   let dayOrNight, currentTime, time;
//   // Convert time to 10 digits to match API format and ascertain if its currently day or night
//   time = todaysDate.getTime();
//   currentTime = Math.floor(time/1000); 
//   if (currentTime > todaysWeather.sunrise && currentTime < todaysWeather.sunset) {
//     dayOrNight = 'Day';
//   } else {
//     dayOrNight = 'Night';
//   } 
//   return { dayOrNight }
// }

// function sunTimes (num, offset) {
//   const newtime = new Date((num + offset) * 1000);
//   const finalTime = format((newtime), 'h:mm a');
//   return finalTime;
// }

// function windDesc (todaysWeather) {
//   // Wind speed, direction and gusts
//   let num = todaysWeather.windDeg;

//   function degToCompass(num) {
//     var val = Math.floor((num / 22.5) + 0.5);
//     var arr = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
//     return arr[(val % 16)];
//   }
//   const windDirection = degToCompass(num);
//   const windSpeed = todaysWeather.windSpeed;
//   const windGusts = todaysWeather.windGust; 
//   let wind = '';
//   if (typeof windGusts == 'undefined') {
//     wind = `${windDirection} at ${windSpeed} km/hr`;
//   } else {
//     wind = `${windDirection} at ${windSpeed} km/h. Gusts at ${windGusts}km/h`;
//   }
//   return wind;
// }

function dayFromSeconds (num) {
  const readableDate = new Date(num * 1000);
  const displayDate = format(new Date(readableDate), 'EEEE')
  return displayDate;
}

// function convertToAMPM (num, offset) {
//   const rawtime = num + offset;
//   const newtime = new Date(rawtime * 1000);
//   const finalTime = format((newtime), 'ha');
//   return finalTime;
// }

function initiateSlides (slideIndex) {

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
  
}

// Event Listeners

document.getElementById('changeLocation').addEventListener("click", () => {
  const value = document.querySelector('input[name="location"]').value;
  console.group(value)
  getWeather(value);
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



export { dayFromSeconds, initiateSlides }