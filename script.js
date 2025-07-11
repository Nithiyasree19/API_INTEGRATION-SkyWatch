const apiKey = "0f9c3b3ebe8ffd3b2fa54043572f2389"

async function getWeather() {
  const city = document.getElementById("cityInput").value;
  const resultBox = document.getElementById("weatherResult");

  if (!city) {
    resultBox.innerHTML = "<p>Please enter a city name.</p>";
    return;
  }

  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );

    if (!res.ok) {
      throw new Error("City not found");
    }

    const data = await res.json();
    const { name, main, weather } = data;

    resultBox.innerHTML = `
      <h2>${name}</h2>
      <img src="https://openweathermap.org/img/wn/${weather[0].icon}@2x.png" alt="weather icon">
      <p><strong>Temperature:</strong> ${main.temp} °C</p>
     <p><strong>Humidity:</strong> ${main.humidity}%</p>
      <p><strong>Condition:</strong> ${weather[0].description}</p>
    `;

    
} catch (err) {
    resultBox.innerHTML = `<p>Error: ${err.message}</p>`;
  }
}

// Auto-load weather by geolocation
window.onload = function () {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(async function (position) {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      try {
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
        );

        const data = await res.json();
        const { name, main, weather } = data;

        document.getElementById("weatherResult").innerHTML = `
          <h2>${name} (Auto Location)</h2>
          <img src="https://openweathermap.org/img/wn/${weather[0].icon}@2x.png" alt="weather icon">
          <p><strong>Temperature:</strong> ${main.temp} °C</p>
          <p><strong>Humidity:</strong> ${main.humidity}%</p>
          <p><strong>Condition:</strong> ${weather[0].description}</p>
        `;
      } catch (err) {
        console.error("Auto location failed", err);
      }
    });
  }
};

