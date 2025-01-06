import { useState } from "react"
import WeatherData from "../components/WeatherData"

const api_key = "e551a72de210257f2859395a80256d97"

function Search() {
  const [city, setCity] = useState("")
  const [loc, setLoc] = useState({ lon: 0, lat: 0 })

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
  }

  return (
    <div className="search-container">
      <div className="search-box">
        <input
          className="search-input"
          type="text"
          value={city}
          onChange={handleInputChange}
          placeholder="Search the weather..."
          style={{ paddingRight: "30px" }}
        />
        <button onClick={handleSearch}>
          <i className="bi bi-search"></i>
        </button>
      </div>
      {loc.lon !== 0 && loc.lat !== 0 && <WeatherData loc={loc} />}
    </div>
  )
}

export default Search
