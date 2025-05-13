const cityName = document.getElementById("cityName");
const search = document.getElementById("search");
const locationNotFound = document.getElementsByClassName("locationNOtFound");
const weatherReport = document.getElementById("weatherReport");
const weatherImage = document.getElementsByClassName("weatherImage");
const temperature = document.querySelector(".weatherInfo h1");
const weatherText = document.querySelector(".weatherInfo p");
const humidity = document.getElementById("percent");
const windSpeed = document.getElementById("wSpeed");

const checkWeather = async (city) => {
    apiKey = "b69bf0932e1805c916084a013929ce1d";
    url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    const weatherData = await fetch(`${url}`)
    .then ((response) => {
        response.json();
    })

    if (weatherData.cod === "404") {
        console.log("Error Location");
        locationNotFound.style.display = "flex";
        weatherReport.style.display = "none";
        return;        
    }

    temperature.innerText = `${Math.round(weatherData.main.temp - 273.15)} °C`;
    weatherText.innerText = `${weatherData.weather[0].description}`;
    humidity.innerText = `${weatherData.main.humidity} %`;
    windSpeed.innerText = `${weatherData.wind.speed} Km/H`;

    switch (weatherData.weather[0].main) {
        case 'Clear':
            weatherImage.src = "Assets/clear.png";
            break;
        case 'Cloud':
            weatherImage.src = "Assets/cloud.png";
            break;
        case 'Mist':
            weatherImage.src = "Assets/mist.png";
            break;
        case 'Rain':
            weatherImage.src = "Assets/rain.png";
            break;
        case 'Snow':
            weatherImage.src = "Assets/snow.png";
            break;
    }

    weatherReport.style.display = "flex"; 
}

search.addEventListener('click', () => {
    checkWeather(cityName.value);
})