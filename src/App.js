import { useState, useCallback, useEffect } from "react";
import axios from "axios";

export default function App() {
  const [city, setCity] = useState("New York"); // Default city
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const API_KEY = process.env.REACT_APP_WEATHER_API_KEY; // Use env variable

  const fetchWeatherData = useCallback(async (cityName) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(cityName)}&units=imperial&appid=${API_KEY}`
      );
      setWeather(response.data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setError("Failed to fetch weather data. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [API_KEY]);

  const fetchWeather = (e) => {
    if (e) e.preventDefault();
    fetchWeatherData(city);
  };

  const fetchMostSearched = (selectedCity) => {
    setCity(selectedCity);
    fetchWeatherData(selectedCity);
  };

  useEffect(() => {
    fetchWeatherData("New York");
  }, [fetchWeatherData]);

  return (
    <>
      <div className="container">
        <div className="info">
          <div className="weatherInfo">
            {loading && <p>Loading...</p>}
            {error && <p className="error">{error}</p>}
            {weather && (
              <>
                <div className="location">
                  <p className="cityName">{weather.name}</p>
                  {weather.sys?.country && <p className="country">{weather.sys.country}</p>}
                </div>
                <div className="degrees">
                  {weather.main?.temp != null && <h1>{weather.main.temp.toFixed()}{"\u00b0F"}</h1>}
                </div>
                <div className="description">
                  {weather.weather?.[0]?.description && <p>{weather.weather[0].description}</p>}
                </div>
                <div className="bottomInfo">
                  {weather.main?.feels_like != null && <p className="feels">Feels: {weather.main.feels_like.toFixed()}{"\u00b0F"}</p>}
                  {weather.main?.humidity != null && <p className="humidity">Humidity: {weather.main.humidity}%</p>}
                  {weather.wind?.speed != null && <p className="wind">Wind Speed: {weather.wind.speed.toFixed()} MPH</p>}
                </div>
              </>
            )}
          </div>
        </div>
        <div className="searchBar">
          <form onSubmit={fetchWeather}>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="search-box"
              placeholder="Search here"
              aria-label="Enter city name"
            />
            <button type="submit" className="search-button" aria-label="Search">Search</button>
          </form>
          <div className="mostSearched">
            <p>Most Searched</p>
            <hr />
          </div>
          <div className="topSearches">
            {["San Francisco", "Madrid", "Athens", "Los Angeles", "Cancun", "London", "Paris", "Miami"].map((city) => (
              <button key={city} type="button" className="cities" onClick={() => fetchMostSearched(city)}>{city}</button>
            ))}
          </div>
          <div className="name">
            <p>Developed by Alieu Barrow</p>
          </div>
        </div>
      </div>
    </>
  );
}
