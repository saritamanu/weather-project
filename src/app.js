function formatDate() {
  let now = new Date();
  let hour = ("0" + now.getHours()).slice(-2);
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
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}
function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = "";
  let days = ["Wed", "Thu", "Fri", "Sat", "Sun"];
  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `<div class="col-sm-2 ">
            <h3><strong>${formatDay(forecastDay.dt)}</strong></h3>
            <img src= "src/images/${
              forecastDay.weather[0].icon
            }.png"  alt="" class="main-weather"  />

            <p>
              <strong id="todayMax">${Math.round(
                forecastDay.temp.max
              )}ºC</strong>/<small id="todayMin"
                >${Math.round(forecastDay.temp.min)}ºC</small
              >
            </p></div>`;
    }
  });

  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=ad22b72462408b5be9391931a8e3091a&units=metric`;

  axios.get(apiUrl).then(displayForecast);
}

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#nowTemp");
  let descriptionElement = document.querySelector("h1");
  let cityName = document.querySelector("#city");

  let iconElement = document.querySelector("#icon");

  celsiusTemperature = response.data.main.temp;
  formatDate();

  temperatureElement.innerHTML = `${temperature}`;
  cityName.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].main;

  iconElement.setAttribute(
    "src",
    `src/images/${response.data.weather[0].icon}.png`
  );
  getForecast(response.data.coord);
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

search("Porto");
