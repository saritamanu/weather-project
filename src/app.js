let now = new Date();
let time = document.querySelector("#currentTime");

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let hour = now.getHours();
let minutes = ("0" + now.getMinutes()).slice(-2);
time.innerHTML = `${day}, ${hour}:${minutes}`;

function showTemperature(response) {
  console.log(response.data);
  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#nowTemp");
  temperatureElement.innerHTML = `${temperature}`;
  let descriptionElement = document.querySelector("h1");
  let city = document.querySelector("#city");
  city.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].main;
  let todayTempMax = Math.round(response.data.main.temp_max);
  let todayTempMin = Math.round(response.data.main.temp_min);
  let todayMax = document.querySelector("#todayMax");
  let todayMin = document.querySelector("#todayMin");
  todayMax.innerHTML = `${todayTempMax}ºC`;
  todayMin.innerHTML = `${todayTempMin}ºC`;
}

function handleSubmit(event) {
  event.preventDefault();
  let search = document.querySelector("#search-input");
  let searchInput = search.value;
  let apiKey = "ad22b72462408b5be9391931a8e3091a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput}&units=metric&appid=ad22b72462408b5be9391931a8e3091a`;
  axios.get(apiUrl).then(showTemperature);
}

let form = document.querySelector("#search");
form.addEventListener("submit", handleSubmit);

function handlePosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiUrlL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=ad22b72462408b5be9391931a8e3091a`;
  axios.get(apiUrlL).then(showTemperature);
}
function getCurrentLocation() {
  navigator.geolocation.getCurrentPosition(handlePosition);
}

let button = document.querySelector("button");
button.addEventListener("click", getCurrentLocation);
//function convertFahrenheit(event) {
//event.preventDefault();
//temperature.innerHTML = `64`;
//}
//function convertCelsius(event) {
//event.preventDefault();
//temperature.innerHTML = `18`;
//}

//let fahrenheit = document.querySelector("#fahrenheit");
//fahrenheit.addEventListener("click", convertFahrenheit);

//let celsius = document.querySelector("#celsius");
//celsius.addEventListener("click", convertCelsius);