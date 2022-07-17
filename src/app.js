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


function displayMainDescription(response) {
    let mainCityElement = document.querySelector("#main-city");
    mainCityElement.innerHTML = response.data.name;

    let mainDescriptionElement = document.querySelector("#main-description");
    mainDescriptionElement.innerHTML = response.data.weather[0].description;
    
    mainTemperatureCelsius = response.data.main.temp;

    let mainTemperatureElement = document.querySelector("#main-temperature");
    mainTemperatureElement.innerHTML = Math.round(mainTemperatureCelsius);

    let mainDateElement = document.querySelector("#main-date");
    mainDateElement.innerHTML = formatDate(response.data.dt * 1000)

    let mainIconElement = document.querySelector("#main-icon");
    mainIconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
    mainIconElement.setAttribute("alt", response.data.weather[0].description)
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

function displayMainTemperatureFahreinheit(event) {
    event.preventDefault();
    let mainTemperatureElement = document.querySelector("#main-temperature");
    mainTemperatureCelsiusLink.classList.remove("main-temperature-celsius-link")
    mainTemperatureFahrenheitLink.classList.add("main-temperature-celsius-link")
    let mainTemperatureFahreinheit = (mainTemperatureCelsius * 9) / 5 + 32;
    mainTemperatureElement.innerHTML = Math.round(mainTemperatureFahreinheit);
}

function displayMainTemperatureCelsius (event) {
    event.preventDefault();
    mainTemperatureCelsiusLink.classList.add("main-temperature-celsius-link")
    mainTemperatureFahrenheitLink.classList.remove("main-temperature-celsius-link")
    let mainTemperatureElement = document.querySelector("#main-temperature");
    mainTemperatureElement.innerHTML = Math.round(mainTemperatureCelsius);
}

let mainTemperatureCelsius = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let mainTemperatureFahrenheitLink = document.querySelector("#main-temperature-fahrenheit-link");
mainTemperatureFahrenheitLink.addEventListener("click", displayMainTemperatureFahreinheit);

let mainTemperatureCelsiusLink = document.querySelector("#main-temperature-celsius-link");
mainTemperatureCelsiusLink.addEventListener("click", displayMainTemperatureCelsius);

search("Gråsten");