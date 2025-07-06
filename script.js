const weatherForm = document.querySelector(".weather-form");
const citySearch = document.querySelector("#weather-search");
const searchBtn = document.querySelector(".search-weather-btn");
const card = document.querySelector(".card");
const container = document.querySelector(".container");
const API_KEY = "2b35c25cf23cf6699ce17b4611bf2c06";

weatherForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const city = citySearch.value;
  if (city) {
    try {
      const weatherData = await getWeather(city);
      displayWeatherData(weatherData);
    } catch (error) {
      console.log(error);
      displayErrors(error);
    }
  } else {
    displayErrors("Please enter a city");
  }
});

function displayErrors(errorMessage) {
  const p = document.createElement("p");
  p.innerText = errorMessage;
  container.appendChild(p);
}

async function getWeather(city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;
  try {
    const weatherData = await fetch(apiUrl);
    if (!weatherData.ok) {
      displayErrors("Error fetching API");
    } else {
      const responseJson = await weatherData.json();
      return responseJson;
    }
  } catch (error) {
    console.log(error);
  }
}

function displayWeatherData(weatherData) {
  if (weatherData !== undefined) {
    card.style.display = "block";
    //City Display
    const cityDisplay = document.createElement("h1");
    cityDisplay.innerText = weatherData.name;
    card.appendChild(cityDisplay);
    //Temperature Display
    const tempDisplay = document.createElement("p");
    const tempData = weatherData.main.temp;
    const tempF = `${((tempData - 273.15) * (9 / 5) + 32).toFixed(1)}°F`;
    tempDisplay.innerText = tempF;
    card.appendChild(tempDisplay);
    //Humidity Display
    const HumDisplay = document.createElement("p");
    HumDisplay.innerText = weatherData.main.humidity;
    card.appendChild(HumDisplay);
    //Description Display
    const descDisplay = document.createElement("p");
    descDisplay.innerText = weatherData.weather[0].description;
    card.appendChild(descDisplay);
  }
}

function clearData() {}
