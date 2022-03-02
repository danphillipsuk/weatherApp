import { getWeather } from '../weatherAPI';

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





export { initiateSlides }