import { useState } from "react";
import axios from "axios";

export default function App() {

  //const API_KEY = "9bd527bc70707a6643cad5b24730fb0d";    
  //const DATA = "https://api.openweathermap.org/data/2.5/weather?q={city}&APPID=9bd527bc70707a6643cad5b24730fb0d";  
  const [city, setCity] = useState(" ");
  const [weather, setWeather] = useState({});
  //const [icon, setIcon] = useState({});
  //const [error, setError] = useState(" ");

  /*useEffect(() => {
    async function fetchData() {
      try {
        const data = await fetchData('https://api.example.com/data');
        setWeather(data);
        setError(" ");
      } catch (error) {
        setError(error);
      }
    }

    fetchData();
  }, []);*/

    //getWeather();

    //"https://api.openweathermap.org/data/2.5/weather?q=London&units=imperial&APPID=9bd527bc70707a6643cad5b24730fb0d"; 
    
    const fetchWeather = (e) => {
     const DATA = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=9bd527bc70707a6643cad5b24730fb0d`;
     e.preventDefault()
     axios.get(DATA).then((response) => {
      setWeather(response.data)
      console.log(response.data)
     })
     setCity("");
  }

  const fetchMostSearched = (city, e) => {
    const url= `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=9bd527bc70707a6643cad5b24730fb0d`;
    e.preventDefault()
    axios.get(url).then((response) => {
     setWeather(response.data)
     console.log(response.data)
    })
    setCity("");
 }

 /*const fetchIcon = (icon, e) => {
  const URl = "https://openweathermap.org/img/wn/${icon}.png";
  setIcon(URl);
 }*/

  /*const getWeather = async () => {
    if (city === " ") {
      alert("Please enter a city name");
      return;
    }

    try {
      const response = await fetch(DATA);
      if (!response.ok) {
        throw new Error("City not found");
      }
      const data = await response.json();
      //console.log(data);
      setWeather(data);
      //setError(" ");
    } catch (error) {
      console.log(error.message);
      //setWeather(null);
    }
  }*/
    

  //  const DATA = "https://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=9bd527bc70707a6643cad5b24730fb0d"; 

  //   checkWeather();

  //   async function checkWeather() {

  //     try {
  //       const response = await fetch(DATA);
  //       if (!response.ok) {
  //         throw new Error("City not found");
  //       }
  //       var data = await response.json();
  //       console.log(data);
  //     } catch (error) {
  //       console.log(error.message);
  //       //setWeather(null);
  //     }
  //   }

return (
    <>
    <div className="container"> 
      <div className="info">
        <div className="weatherInfo">
          <div className="location">
            <p className="cityName">{weather.name}</p>
            {weather.sys ? <p className="country"> {weather.sys.country}</p> : null}
          </div>
          <div className="degrees">
            {weather.main ? <h1>{weather.main.temp.toFixed()}°F</h1> : null}
          </div>
          <div className="description">
            {weather.weather ? <p>{weather.weather[0].description}</p> : null}
          </div>
          <div className="bottomInfo">
              {weather.main ? <p className="feels">Feels: {weather.main.feels_like.toFixed()}°F</p> : null}
              {weather.main ? <p className="humidity">Humidity: {weather.main.humidity}%</p> : null}
              {weather.wind ? <p className="wind">Wind Speed: {weather.wind.speed.toFixed()} MPH</p> : null}
          </div>
        </div>
      </div>
      <div className="searchBar">
        <form action="/search" method="GET">  
          <input type="text" value={city}  onChange={(e) => setCity(e.target.value)} className="search-box" placeholder="Search here"></input>
          <button type="submit" className="search-button" onClick={fetchWeather}>Search</button> 
        </form>
        <div className="mostSearched">
          <p>Most Searched</p>
          <hr></hr>
        </div>
        <div className="topSearches">
          <p className="cities" onClick={(e) => fetchMostSearched("San Francisco", e)}>San Francisco</p> 
          <p className="cities" onClick={(e) => fetchMostSearched("Madrid", e)}>Madrid</p>
          <p className="cities" onClick={(e) => fetchMostSearched("Athens", e)}>Athens</p>
          <p className="cities" onClick={(e) => fetchMostSearched("Los Angeles", e)}>Los Angeles</p>
          <p className="cities" onClick={(e) => fetchMostSearched("Cancun", e)}>Cancun</p>
          <p className="cities" onClick={(e) => fetchMostSearched("London", e)}>London</p>
          <p className="cities" onClick={(e) => fetchMostSearched("Paris", e)}>Paris</p>
          <p className="cities" onClick={(e) => fetchMostSearched("Miami", e)}>Miami</p>
        </div>
        <div className="name">
          <p>Developed by Alieu Barrow</p>  
        </div>
      </div>
    </div>
    </>
  );
}

