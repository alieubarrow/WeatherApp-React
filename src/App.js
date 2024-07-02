import { useState } from "react";
import axios from "axios";

export default function App() {

  //const API_KEY = "9bd527bc70707a6643cad5b24730fb0d";    
  //const DATA = "https://api.openweathermap.org/data/2.5/weather?q={city}&APPID=9bd527bc70707a6643cad5b24730fb0d";  
  const [city, setCity] = useState(" ");
  const [weather, setWeather] = useState({});
  //const [error, setError] = useState(" ");
  const [loading, setLoading] = useState(false)

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

    const DATA = "https://api.openweathermap.org/data/2.5/weather?q=Dubai&APPID=9bd527bc70707a6643cad5b24730fb0d"; 
    
    const fetchWeather = (e) => {
     e.preventDefault()
     setLoading(true)
     axios.get(DATA).then((response) => {
      setWeather(response.data)
      console.log(response.data)
     })
     setCity("");
     setLoading(false)
  }

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
      <div className ="info">
        <img src="./images/background.jpg" alt="404"></img>
      </div>
      <div>
       {/*<p>{weather.name}</p>*/}
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
          <p className="cities">Cyprus</p>
          <p className="cities">Madrid</p>
          <p className="cities">Athens</p>
          <p className="cities">Bahamas</p>
          <p className="cities">Cancun</p>
          <p className="cities">London</p>
          <p className="cities">Paris</p>
          <p className="cities">Miami</p>
        </div>
        <div className="name">
          <p>Developed by Alieu Barrow</p>  
        </div>
      </div>
    </div>
    </>
  );
}

