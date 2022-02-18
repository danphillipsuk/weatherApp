// function apiCalls () {

let oneCall;

async function getWeather () {

  try {
    // Get current weather report to give us city name and lat/lon coordinates
    const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=Rothbury&units=metric&APPID=5a75251970a67885f4e3d704fe65eed0`, { mode: 'cors' });
    const weatherData = await response.json();
    const lat = weatherData.coord.lat; 
    const lon = weatherData.coord.lon;
    const city = weatherData.name;

    // Use lat/lon cordinates from first fetch to pass into oneCall service, giving us current and forecast data
    const secondResponse = await fetch(`http://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&APPID=5a75251970a67885f4e3d704fe65eed0`, { mode: 'cors' });
    oneCall = await secondResponse.json();
    console.log(oneCall)
      
  } catch(err) {
    console.log(err)
  }
}


getWeather().then(function tryThis() {
  console.log(oneCall)
});



// const weatherFactory = (city, weather, currentTemp) => {
//   return { city, weather, currentTemp };
// }

// const today = weatherFactory('rothbury', 'Clear & sunny', 21);

// //   let num = data.wind.deg

// //   function degToCompass(num) {
// //     var val = Math.floor((num / 22.5) + 0.5);
// //     var arr = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
// //     console.log(arr[(val % 16)]);
// //     return arr[(val % 16)];
// // }
// //   degToCompass(num);






export { getWeather }



