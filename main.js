const apiKey = "bd5244acd70cd5de40a52ffb4cfa31e1";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric";

const searchBox = document.querySelector(".inner input");
const searchBtn = document.querySelector(".inner button");
const weatherIcon = document.querySelector(".weather-icon");

async function getWeatherByCoordinates(latitude, longitude) {
    const response = await fetch(`${apiUrl}&lat=${latitude}&lon=${longitude}&appid=${apiKey}`);
    const data = await response.json();
    updateWeather(data);
}

async function checkWeather(city){
    const response = await fetch(`${apiUrl}&q=${city}&appid=${apiKey}`);
    const data = await response.json();
    updateWeather(data);
}

function updateWeather(data) {
    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " km/hr";

    switch (data.weather[0].main) {
        case "Clouds":
            weatherIcon.src = 'images/clouds.png';
            break;
        case "Clear":
            weatherIcon.src = 'images/clear.png';
            break;
        case "Rain":
            weatherIcon.src = 'images/rain.png';
            break;
        case "Drizzle":
            weatherIcon.src = 'images/drizzle.png';
            break;
        case "Mist":
            weatherIcon.src = 'images/mist.png';
            break;
        default:
            weatherIcon.src = 'images/unknown.png';
            break;
    }
}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            getWeatherByCoordinates(position.coords.latitude, position.coords.longitude);
        });
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});

getLocation();