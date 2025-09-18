const WeatherCard = ({weather}) => { 
    return (
      <div className="weather-card">
        <h1 className="location">{weather.location.name}</h1>
        <p className="region">{weather.location.region}, {weather.location.country}</p>
        
        {/* Weather Icon */}
        <img 
          src={weather.current.condition.icon} 
          alt={weather.current.condition.text} 
          className="weather-icon"
        />
  
        <h2 className="temperature">{weather.current.temp_c}°C</h2>
        <p className="feels">Feels like {weather.current.feelslike_c}°C</p>
        
        <p className="condition">{weather.current.condition.text}</p>
  
        <div className="extra-info">
          <div className="info-card">
            <span>💧 Humidity</span>
            <p>{weather.current.humidity}%</p>
          </div>
          <div className="info-card">
            <span>💨 Wind</span>
            <p>{weather.current.wind_kph} km/h</p>
          </div>
        </div>
      </div>
    )
  }
  
  export default WeatherCard
  