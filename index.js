const input = document.querySelector("#input");
const img = document.querySelector("#img");
const forecastButton = document.querySelector("#forecast");

async function weatherToday(value) {
  const url = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${value}&appid=4d6f7c508a8274ee740483e4aab8ca29&units=metric `
  );
  const data = await url.json();
  console.log(data);
  const weather = document.querySelector("#weather");
  weather.innerHTML = `
      <h1>${data.name}</h1>
      <p>${data.weather[0].description}</p>
      <p>${Math.round(data.main.temp)} °C</p>
      <p>${data.main.humidity} %</p>
    `;
  img.innerHTML = "";
  const imgdiv = document.createElement("img");
  imgdiv.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  img.appendChild(imgdiv);
}

input.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    if (input.value) {
      const weather = document.querySelector("#weather");
      weather.innerHTML = "";
      weatherToday(input.value);
    }
  }
});

forecastButton.addEventListener("click", (event) => {
  event.preventDefault();
  if (input.value) {
    if (forecastButton.checked) {
      forecastButton.checked = true;
      const weather = document.querySelector("#weather");
      weather.innerHTML = "";
      forecast(input.value);
    } else {
      const weather = document.querySelector("#weather");
      weather.innerHTML = "";
      weatherToday(input.value);
      forecastButton.checked = false;
    }
    if (forecastButton.checked) {
      forecastButton.checked = true;
    } else {
      forecastButton.checked = false;
    }
  }
});

async function forecast(value) {
  const url = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${value}&appid=4d6f7c508a8274ee740483e4aab8ca29&units=metric `
  );
  const data = await url.json();
  console.log(data);
  const forecast = document.querySelector("#weather");
  img.innerHTML = "";
  forecast.innerHTML = `
    <div class="forecastName">
      <h1>${data.city.name}</h1>
      <h2>Forecast</h2> 
    </div>
    <div class="forecastDiv">
      ${data.list
        .map(
          (item) => `
      <div class="forecast">
      <li>${Math.round(
        item.main.temp
      )} °C </li><li><img src="http://openweathermap.org/img/wn/${
            item.weather[0].icon
          }@2x.png">      </li> <li>${item.dt_txt}</li>
      </div>
      `
        )
        .join("")}
    </div>
  `;
}
