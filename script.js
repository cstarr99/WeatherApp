const weatherForm = document.querySelector(".weather-form");
const citySearch = document.querySelector("#weather-search");
const searchBtn = document.querySelector(".search-weather-btn");
const card = document.querySelector(".card");
const container = document.querySelector(".container");
const errors = document.querySelector(".error");
const errorsList = document.querySelector(".errors-list");
const API_KEY = "2b35c25cf23cf6699ce17b4611bf2c06";

weatherForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  clearData();
  clearErrors();
  const city = citySearch.value;
  //If a city is entered then try to get the weather and display.
  if (city) {
    try {
      const weatherData = await getWeather(city);
      displayWeatherData(weatherData);
      //If try fails then display and print error in catch.
    } catch (error) {
      console.log(error);
      displayErrors(error);
    }
    //If no city then display error below.
  } else {
    displayErrors("Please enter a city");
  }
});

//displays errors in card when error is made.
function displayErrors(errorMessage) {
  errors.style.display = "block";
  const li = document.createElement("li");
  li.innerText = errorMessage;
  errorsList.appendChild(li);
}

//Uses API to get weather data for corresponding city.
async function getWeather(city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;
  try {
    //Tries to get api and turn code into json
    const weatherData = await fetch(apiUrl);
    //If can't fetch API then display the error.
    if (!weatherData.ok) {
      displayErrors(
        "Error fetching API: Please make sure city spelling is correct."
      );
      //If API could be fetched turn it into json and return.
    } else {
      return await weatherData.json();
    }
    //If try doesn't work, then catch runs and prints error.
  } catch (error) {
    console.log(error);
  }
}

function displayWeatherData(weatherData) {
  if (weatherData !== undefined) {
    //adding each element by creating the element then making the innertext equal the matching data from the API.

    card.style.display = "flex";
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
    HumDisplay.innerText = `Humidity: ${weatherData.main.humidity}%`;
    card.appendChild(HumDisplay);
    //Description Display
    const descDisplay = document.createElement("p");
    descDisplay.innerText = weatherData.weather[0].main;
    card.appendChild(descDisplay);
    //Feels like
    const feelsLike = document.createElement("p");
    const feelsLikeData = weatherData.main.feels_like;
    const feelsLikeF = `Feels Like: ${(
      (feelsLikeData - 273.15) * (9 / 5) +
      32
    ).toFixed(1)} °F`;
    feelsLike.innerText = feelsLikeF;
    card.appendChild(feelsLike);

    //add classlist to all data elements
    cityDisplay.classList.add("city-display");
    tempDisplay.classList.add("temp-display");
    HumDisplay.classList.add("hum-display");
    descDisplay.classList.add("desc-display");
    feelsLike.classList.add("feels-like");
  }
}

//function that clears old data when new form submitted.
function clearData() {
  while (card.children[0] != undefined || null) {
    card.removeChild(card.children[0]);
  }
  card.style.display = "none";
}

//function that clears old errors when new form submitted.
function clearErrors() {
  while (errorsList.children[0] != undefined || null) {
    errorsList.removeChild(errorsList.children[0]);
  }
  errors.style.display = "none";
}
