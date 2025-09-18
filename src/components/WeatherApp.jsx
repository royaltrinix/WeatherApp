import { useState, useEffect} from "react"
import WeatherCard from "./WeatherCard"
import LoadingSpinner from "./LoadingSpinner"
const WeatherApp = () => {

    const [weather, setWeather] = useState(null)
    const [location, setLocation] = useState("Manchester")
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)

    const API_KEY = import.meta.env.VITE_WEATHER_API_KEY


    useEffect(() => {
        setTimeout(()=> {
            fetch(`http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${location}`)
            .then(res => {
                if(!res.ok){
                    throw Error("Could not fetch the data from the source")
                }
                return res.json();
            })
            .then(data => {
                setWeather(data);
                setError(null)
            })
            .catch(err => {
                setError(err.message)
            })
            .finally(() => {
                setIsLoading(false)   
            })
        }, 1000)

    }, [location])

    const handleLocationSubmit =(e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        const newLocation = formData.get('location')
        setLocation(newLocation)
        e.target.reset()
    }


    const getBackgroundClass = (weather) => {
        if (!weather) return "default-bg";
      
        const condition = weather.current.condition.text.toLowerCase();
        const isDay = weather.current.is_day === 1;
      
        if (condition.includes("sun") || condition.includes("clear")) {
          return isDay ? "sunny-bg" : "night-bg";
        }
        if (condition.includes("cloud")) {
          return "cloudy-bg";
        }
        if (condition.includes("rain")) {
          return "rainy-bg";
        }
        if (condition.includes("snow")) {
          return "snowy-bg";
        }
      
        return isDay ? "default-day" : "default-night";
      };
      

  return (
    <div className={`weather-container ${getBackgroundClass(weather)}`}>
      <form onSubmit={handleLocationSubmit} className="weather-form">
        <input
          type="text"
          name="location"
          placeholder="Enter city name..."
        />
        <button type="submit">Search</button>
      </form>
        { error && <div>{ error }</div> }
        { isLoading && <LoadingSpinner/> }
        { weather && <WeatherCard weather={weather}/> }
    </div>
  )
}

export default WeatherApp;