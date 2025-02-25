import React, { useEffect, useRef, useState } from 'react';
import './Weather.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
function Weather() {
  const inputRef = useRef()
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState("");

  const allIcons = {
    "01d": "bi-sun",          // Clear day
    "01n": "bi-moon",         // Clear night
    "02d": "bi-cloud-sun",    // Few clouds day
    "02n": "bi-cloud-moon",   // Few clouds night
    "03d": "bi-cloud",        // Scattered clouds
    "03n": "bi-cloud",
    "04d": "bi-clouds",       // Broken clouds
    "04n": "bi-clouds",
    "09d": "bi-cloud-drizzle",// Shower rain
    "09n": "bi-cloud-drizzle",
    "10d": "bi-cloud-rain",   // Rain
    "10n": "bi-cloud-rain",
    "11d": "bi-cloud-lightning", // Thunderstorm
    "11n": "bi-cloud-lightning",
    "13d": "bi-snow",         // Snow
    "13n": "bi-snow",
    "50d": "bi-cloud-fog",    // Mist
    "50n": "bi-cloud-fog"
  };
  

  const search = async (city) => {
    if (city === ""){
      alert("Enter City Name");
      return;
    }
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_API_KEY}`;
      const response = await fetch(url);
      const data = await response.json();

      if (!response.ok){
        alert(data.message);
        return;
      }
      console.log(data);
      if (data && data.weather && data.weather[0]) {
        const icon = allIcons[data.weather[0].icon] ||  "bi-question-circle";
        setWeatherData({
          humidity: data.main.humidity,
          windSpeed: data.wind.speed,
          temperature: Math.floor(data.main.temp),
          location: data.name,
          icon: icon,
        });
        setCity("");
      }
    } catch (error) {
      setWeatherData(false);
      console.error("Error fetching weather data:", error);
    }
  };

  useEffect(() => {
    search("London");
  }, []);

  return (
    <div className='weather'>
      <div className='search-bar'>
        <input ref={inputRef}
          type='text'
          placeholder='Search city..'
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={() => search(city)}>
          <i className="bi bi-search"></i>
        </button>
      </div>
      
      {weatherData?<>
        <div className='weather-icon'>
        <i className={`bi ${weatherData.icon}`} style={{ fontSize: "100px" }}></i>
        </div>
          <p className='temperature'>{weatherData.temperature}°C</p>
          <p className='location'>{weatherData.location}</p>
          <div className='weather-data'>
          <div className='col'>
              <i className="bi bi-moisture" style={{ fontSize: "40px" }}></i>
              <div>
                <p>{weatherData.humidity}%</p>
                <span>Humidity</span>
              </div>
            </div>
            <div className='col'>
              <i className="bi bi-wind" style={{ fontSize: "40px" }}></i>
              <div>
                <p>{weatherData.windSpeed} km/h</p>
                <span>Wind Speed</span>
              </div>
            </div>
          </div>
        </>:<>
        <p className='no-data'>Search for a city to see weather data!</p>
        </>}
    </div>
  );
}

export default Weather;