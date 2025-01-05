import { useState } from "react"

const api_key = "e551a72de210257f2859395a80256d97"

function Search() {
  const [city, setCity] = useState("")
  const [loc, setLoc] = useState({ lon: 0, lat: 0 })
  const [weather, setWeather] = useState({
    temp: 0,
    temp_max: 0,
    temp_min: 0,
    feels_like: 0,
    humidity: 0,
    pressure: 0,
    wind_angle: 0,
    wind_speed: 0,
    weather: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCity(e.target.value)
  }

  const handleSearch = () => {
    fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${api_key}`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        return response.json()
      })
      .then((data) => {
        if (data.length > 0) {
          setLoc({ lon: data[0].lon, lat: data[0].lat })
        } else {
          console.error("No location data found")
        }
      })
      .catch((error) => console.error("Error:", error))
      .then(() => {
        fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${loc.lat}&lon=${loc.lon}&appid=${api_key}`
        )
          .then((response) => {
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`)
            }
            return response.json()
          })
          .then((data) => {
            setWeather({
              temp: data.main.temp - 273.15,
              temp_max: data.main.temp_max - 273.15,
              temp_min: data.main.temp_min - 273.15,
              feels_like: data.main.feels_like - 273.15,
              humidity: data.main.humidity,
              pressure: data.main.pressure,
              wind_angle: data.wind.deg,
              wind_speed: data.wind.speed,
              weather: data.weather[0].description,
            })
          })
          .catch((error) => console.error("Error:", error))
      })
  }

  return (
    <>
      <h1>Search for a city:</h1>
      <input type="text" value={city} onChange={handleInputChange} />
      <button onClick={handleSearch}>Search</button>
      <p>
        Temperature: {weather.temp}°C, Max: {weather.temp_max}°C, Min:
        {weather.temp_min}°C
      </p>
      <p>Feels like: {weather.feels_like}°C</p>
      <p>Humidity: {weather.humidity}%</p>
      <p>Pressure: {weather.pressure}hPa</p>
      <p>
        Wind: {weather.wind_angle}° at {weather.wind_speed}m/s
      </p>
      <p>Weather: {weather.weather}</p>
    </>
  )
}

export default Search
