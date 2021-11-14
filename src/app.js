function formatDate() {
  let now = new Date();
  let hour = now.getHours();
  let minutes = ("0" + now.getMinutes()).slice(-2);
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
  let time = document.querySelector("#currentTime");
  time.innerHTML = `${day}, ${hour}:${minutes}`;
}

function showTemperature(response) {
  console.log(response.data);
  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#nowTemp");
  let descriptionElement = document.querySelector("h1");
  let cityName = document.querySelector("#city");
  let todayTempMax = Math.round(response.data.main.temp_max);
  let todayTempMin = Math.round(response.data.main.temp_min);
  let todayMax = document.querySelector("#todayMax");
  let todayMin = document.querySelector("#todayMin");
  let iconElement = document.querySelector("#icon");
  let iconTodayElement = document.querySelector("#today");

  celsiusTemperature = response.data.main.temp;
  formatDate();

  temperatureElement.innerHTML = `${temperature}`;
  cityName.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].main;
  todayMax.innerHTML = `${todayTempMax}ºC`;
  todayMin.innerHTML = `${todayTempMin}ºC`;
  iconElement.setAttribute(
    "src",
    `src/images/${response.data.weather[0].icon}.png`
  );
  iconTodayElement.setAttribute(
    "src",
    `src/images/${response.data.weather[0].icon}.png`
  );
}

function search(city) {
  let apiKey = "ad22b72462408b5be9391931a8e3091a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=ad22b72462408b5be9391931a8e3091a`;
  axios.get(apiUrl).then(showTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-input").value;
  search(city);
}

function futureForecast(response) {
  let apiUrlFuture = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=ad22b72462408b5be9391931a8e3091a`;
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

function convertFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#nowTemp");
  celsius.classList.remove("active");
  fahrenheit.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function convertCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#nowTemp");
  celsius.classList.add("active");
  fahrenheit.classList.remove("active");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", convertFahrenheit);

let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", convertCelsius);
search("Porto");
