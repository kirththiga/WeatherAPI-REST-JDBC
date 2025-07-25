const accessKey ="3e179824d8db4b22971164302252307";

const baseUrl = "http://api.weatherapi.com/v1";

const currentWeather = document.getElementById("currentWeather");
const futureForecast = document.getElementById("futureForecast");
const unitToggle = document.getElementById("unitToggle");
const getWeatherBtn = document.getElementById("getWeatherBtn");
const forecastBtns = document.getElementById("forecastBtns");

// Initialize variables
let filterType = "less";
let filterValue = 0;

// ************************************** Index Page ****************************************
if(document.getElementById("weatherForm")) {

  let city = "";

  // Validate the city input field
  document.getElementById("city").addEventListener("input", function () {
      
    city = document.getElementById("city").value.trim();
    const isValidCity = validateCityInput(city);

    if(isValidCity) {
      document.getElementById("city").classList.add("is-valid");
      document.getElementById("city").classList.remove("is-invalid");
      getWeatherBtn.disabled = false;
    } 
    else {
      document.getElementById("city").classList.remove("is-valid");
      document.getElementById("city").classList.add("is-invalid");
      getWeatherBtn.disabled = true;
    }
  });

  // Display weather when form is submitted.
  document.getElementById("weatherForm").addEventListener("submit", function (e) {
    e.preventDefault();
    
    // Alert if the user clears or doesn't enter a city name.
    if (city === "") {
      getWeatherBtn.disabled = true;
      alert("Enter a valid city name! No blank fields allowed!");
      return;
    }

    localStorage.setItem("cityInput", city);

    const currentWeatherUrl = `${baseUrl}/current.json?key=${accessKey}&q=${city}`;

    currentWeather.innerHTML = "";

    let unit = "C";

    if(unitToggle.checked) {
      unit = "F";
    }

    localStorage.setItem("unit", unit);

    fetch(`${currentWeatherUrl}`)
    .then((res) => {
      if(!res.ok) {
        throw new Error("Failed to fetch current weather!");
      }
      
      return res.json();
    })
    .then((data) => {

      const isF = localStorage.getItem("unit") === "F";
      let temp = data.current.temp_c;
      let tempUnits = "°C";
      let feelsTemp = data.current.feelslike_c;

      if(isF) {
        temp = data.current.temp_f;
        tempUnits = "°F";
        feelsTemp = data.current.feelslike_f;
      }

      currentWeather.style.backgroundColor = "white";

      currentWeather.innerHTML = `
      <h5>Weather at ${data.location.name}, ${data.location.region}, ${data.location.country}</h5>
      <p><strong>${temp}${tempUnits}</strong>, ${data.current.condition.text}
      <img src="https:${data.current.condition.icon}"/></p>

      <ul class="list-group mb-3">
        <li class="list-group-item">Humidity: ${data.current.humidity}%</li>
        <li class="list-group-item">Wind: ${data.current.wind_kph} kph</li>
        <li class="list-group-item">Feels like: ${feelsTemp}${tempUnits}</li>
        <li class="list-group-item">UV Index: ${data.current.uv}</li>
        <li class="list-group-item">Last Updated: ${data.current.last_updated}</li>
      </ul>
      `;

      forecastBtns.innerHTML = `
        <a href="future-forecast.html" class="btn btn-secondary">5 Day Forecast</a>
        <a href="future-forecast-ten.html" class="btn btn-secondary">10 Day Forecast</a>
        <a href="index.html" class="btn btn-primary">Manage Favorites</a>
      `;

      document.getElementById("windy").style.display = "block";

      const options = {
        key: 'I9T69jATAgCSO456blAyG73lKkogFzk5',

        // Optional: Initial state of the map
        lat: `${data.location.lat}`,
        lon: `${data.location.lon}`,
        zoom: 5,
      };

      // Initialize Windy API
      windyInit(options, windyAPI => {
          const { map } = windyAPI;

          L.popup()
              .setLatLng([`${data.location.lat}`, `${data.location.lon}`])
              .setContent(`${data.location.name}`)
              .openOn(map);
      });   
    });
  });

  // Clear the city input field
  document.getElementById("clearBtn").addEventListener("click", function () {
    city = "";
    
    document.getElementById("city").value = "";
    document.getElementById("city").focus();

    document.getElementById("city").classList.remove("is-valid");
    document.getElementById("windy").style.display = "none";
  });
}

// ************************************** 5 Day Forecast ****************************************
else if(document.getElementById("fiveForecast")) {

  const city = localStorage.getItem("cityInput");

  const forecastUrl = `${baseUrl}/forecast.json?key=${accessKey}&q=${city}&days=5`;

  fetch(`${forecastUrl}`)
  .then((res) => {
    if(!res.ok) {
      throw new Error("Failed to fetch current weather!");
    }
    
    return res.json();
  })
  .then((data) => {
    
    getForecast(data.forecast.forecastday);
    
    forecastBtns.innerHTML = `
    <div class="mb-3">
      <a href="index.html" class="btn btn-info">Weather today</a>
      <a href="future-forecast-ten.html" class="btn btn-secondary">10 Day Forecast</a>
      <a href="index.html" class="btn btn-primary">Manage Favorites</a>
    </div>
    `;

  });
}

// ************************************** 10 Day Forecast ****************************************
else if(document.getElementById("tenForecast")) {

  const city = localStorage.getItem("cityInput");

  const forecastUrl = `${baseUrl}/forecast.json?key=${accessKey}&q=${city}&days=10`;

  fetch(`${forecastUrl}`)
  .then((res) => {
    if(!res.ok) {
      throw new Error("Failed to fetch current weather!");
    }
    
    return res.json();
  })
  .then((data) => {

    getForecast(data.forecast.forecastday);
    
    document.getElementById("filterForm").addEventListener("submit", function (e) {
      e.preventDefault();

      filterType = document.getElementById("filterType").value;
      filterValue = Number(document.getElementById("filterValue").value);
      
      const filteredData = data.forecast.forecastday.filter(forecastFilter);

      getForecast(filteredData);
    });


    document.getElementById("resetFilter").addEventListener("click", function (e) {
      e.preventDefault();

      document.getElementById("filterType").value = "less";
      document.getElementById("filterValue").value = "";

      getForecast(data.forecast.forecastday);
    });

    forecastBtns.innerHTML = `
    <div class="mb-3">
      <a href="index.html" class="btn btn-info">Weather today</a>
      <a href="future-forecast.html" class="btn btn-secondary">5 Day Forecast</a>
      <a href="index.html" class="btn btn-primary">Manage Favorites</a>
    </div>
    `;

  });
}

//*********************** Function to get and display the forecast ***********************
function getForecast(data) {
  const isF = localStorage.getItem("unit") === "F";
  let tempUnits = "°C";

  futureForecast.innerHTML = "";
  
  data.forEach((element) => {
    let temp = element.day.avgtemp_c;

    if(isF) {
      temp = element.day.avgtemp_f;
      tempUnits = "°F";
    }

  futureForecast.innerHTML += `
    <div class="card p-3">
      <h5 class="text-center">${element.date}</h5>
      <img class="mb-4" src="https:${element.day.condition.icon}"/>
      <p class="text-center">${temp}${tempUnits}</p>
      <p class="text-center">${element.day.condition.text}</p>
    </div>
    `;
  });
}

//*********************** Function to filter forecast data ***********************
function forecastFilter(element) {
  const isF = localStorage.getItem("unit") === "F";

  let temp = element.day.avgtemp_c;

  if(isF) {
    temp = element.day.avgtemp_f;
  }

  if(filterType === "less") {
    return temp < filterValue;
  } else if(filterType === "greater") {
    return temp > filterValue;
  } else {
    // If no filter type is selected.
    return true;
  }
}

//*********************** Function to validate city name ***********************
function validateCityInput(city) {
  const regex = /^[A-Za-z\s]+$/;
  return regex.test(city.trim());
}