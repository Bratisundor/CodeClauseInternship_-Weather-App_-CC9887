document.getElementById('searchBtn').addEventListener('click', function() {
  const location = document.getElementById('location').value;
  const apiKey = '368ab909d76b49a892d144747242310'; 
  const apiUrl = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location}&days=1&aqi=no&alerts=no`;

  const errorMessage = document.getElementById('error-message');
  const weatherInfo = document.getElementById('weather-info');
  const hourlyWeatherDiv = document.getElementById('hourly-weather');
  errorMessage.innerText = '';
  weatherInfo.style.display = 'none';
  hourlyWeatherDiv.innerHTML = '';

  fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error('City not found');
      }
      return response.json();
    })
    .then(data => {
      const locationName = data.location.name;
      const temp = data.current.temp_c;
      const feelsLike = data.current.feelslike_c;
      const condition = data.current.condition.text;
      const humidity = data.current.humidity;
      const windSpeed = data.current.wind_kph;

      document.getElementById('city-name').innerText = `Weather in ${locationName}`;
      document.getElementById('temp').innerText = `Temperature: ${temp}°C`;
      document.getElementById('feels-like').innerText = `Feels Like: ${feelsLike}°C`;
      document.getElementById('condition').innerText = `Condition: ${condition}`;
      document.getElementById('humidity').innerText = `Humidity: ${humidity}%`;
      document.getElementById('wind').innerText = `Wind Speed: ${windSpeed} kph`;
      const hourlyData = data.forecast.forecastday[0].hour;
      hourlyData.forEach(hour => {
        const time = hour.time.split(' ')[1]; 
        const temp = hour.temp_c;
        const icon = hour.condition.icon;
        const hourlyItem = `
          <div class="hourly-weather-item">
            <p>${time}</p>
            <img src="${icon}" alt="weather icon" />
            <p>${temp}°C</p>
          </div>`;
        hourlyWeatherDiv.innerHTML += hourlyItem;
      });

      weatherInfo.style.display = 'block';
    })
    .catch(error => {
      errorMessage.innerText = error.message;
    });
});
