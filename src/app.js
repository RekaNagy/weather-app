function formatDate(timestamp) {
    let date = new Date(timestamp);
    let hours = date.getHours();
    if (hours < 10) {
        hours = `0${hours}`;
    }
    let minutes = date.getMinutes();
    if (minutes < 10) {
        minutes = `0${minutes}`;
    }
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day = days[date.getDay()];
    return `${day} ${hours}:${minutes}`;
}

function formatWeatherForecast(timestamp) {
    let weatherForecastDate = new Date(timestamp * 1000);
    let weatherForecastDay = weatherForecastDate.getDay();
    let weatherForecastDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat",];

    return weatherForecastDays[weatherForecastDay];
}

function displayWeatherForecast(response) {
    let weatherForecast = response.data.daily;
    let weatherForecastElement = document.querySelector("#weather-forecast");

    let days = ["Thu", "Fri", "Sat", "Sun", "Mon", "Tue"];
 
    let weatherForecastHTML = `<div class="row">`;
    weatherForecast.forEach(function(forecastDay, index) {
        if (index < 6) {
    weatherForecastHTML = 
        weatherForecastHTML + 
        `

            <div class="col-2">
                <div class="forecast-days">${formatWeatherForecast(forecastDay.dt)}</div>
                <img src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" alt="" width="60" class="forecast-icons"/>
                <div class="forecast-temp">
                    <span class="forecast-temp-max">${Math.round(forecastDay.temp.max)}°</span>/<span class="forecast-temp-min">${Math.round(forecastDay.temp.min)}°</span>
                </div>
            </div>
        
        `;
        }
    });

    weatherForecastHTML = weatherForecastHTML + `</div>`;
    weatherForecastElement.innerHTML = weatherForecastHTML;  
}

function getForecast(coordinates) {
    let apiKey = "1c9bea782c651831e80913359dee2953"
    let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayWeatherForecast);
    
}

function displayMainDescription(response) {
    let mainCityElement = document.querySelector("#main-city");
    mainCityElement.innerHTML = response.data.name;

    let mainDescriptionElement = document.querySelector("#main-description");
    mainDescriptionElement.innerHTML = response.data.weather[0].description;
    
    mainTemperatureCelsius = response.data.main.temp;

    let mainTemperatureElement = document.querySelector("#main-temperature");
    mainTemperatureElement.innerHTML = Math.round(mainTemperatureCelsius);

    let mainDateElement = document.querySelector("#main-date");
    mainDateElement.innerHTML = formatDate(response.data.dt * 1000);

    let mainIconElement = document.querySelector("#main-icon");
    mainIconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
    mainIconElement.setAttribute("alt", response.data.weather[0].description);

    getForecast(response.data.coord);

}

function displayMainWeatherDetails(response) {
    let feelsLikeElement = document.querySelector("#feels-like");
    feelsLikeElement.innerHTML = Math.round(response.data.main.feels_like) + "°";

    let airPressureElement = document.querySelector("#air-pressure");
    airPressureElement.innerHTML = response.data.main.pressure + " hPa";

    let windSpeedElement = document.querySelector("#wind");
    windSpeedElement.innerHTML = Math.round(response.data.wind.speed) + " km/h";

    let humidityElement = document.querySelector("#humidity");
    humidityElement.innerHTML = response.data.main.humidity + "%";
}


function search(city) {
    let apiKey = "1c9bea782c651831e80913359dee2953"
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    axios.get(apiUrl).then(displayMainDescription);
    axios.get(apiUrl).then(displayMainWeatherDetails); 
}

function handleSubmit(event) {
    event.preventDefault();
    let cityInputElement = document.querySelector("#city-input");
    search(cityInputElement.value);
}


let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);


function searchCurrentLocation(position) {
    let apiKey = "1c9bea782c651831e80913359dee2953";
    let units = "metric";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=${units}`;
  
    axios.get(apiUrl).then(displayMainDescription);
  }
  
  
function getCurrent(event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(searchCurrentLocation);
  }

let currentLocButton = document.querySelector("#location-dot-button");
currentLocButton.addEventListener("click", getCurrent);

search("Gråsten");
