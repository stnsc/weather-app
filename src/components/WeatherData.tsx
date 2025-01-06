import { useState, useEffect } from "react"

interface Schedule {
  dt_txt: string
  main: {
    temp: number
    feels_like: number
  }
  weather: {
    main: string
    icon: string
  }[]
}

interface Location {
  loc: {
    lon: number
    lat: number
  }
}

const api_key = "e551a72de210257f2859395a80256d97"

const getColorForTemperature = (temp: number) => {
  const startColor = [0, 225, 255] // Light blue (RGB)
  const endColor = [255, 165, 0] // Orange (RGB)
  const ratio = temp / 30

  const r = Math.round(startColor[0] + ratio * (endColor[0] - startColor[0]))
  const g = Math.round(startColor[1] + ratio * (endColor[1] - startColor[1]))
  const b = Math.round(startColor[2] + ratio * (endColor[2] - startColor[2]))

  return `${r},${g},${b}`
}

function WeatherData({ loc }: Location) {
  const [weather, setWeather] = useState({
    temp: 0,
    temp_max: 0,
    temp_min: 0,
    feels_like: 0,
    location: "",
    humidity: 0,
    pressure: 0,
    wind_angle: 0,
    wind_speed: 0,
    weather: "",
    weather_icon: "",
    sunrise: "",
    sunset: "",
    timezone: 0,
  })
  const [forecast, setForecast] = useState([])

  useEffect(() => {
    if (loc.lon !== 0 && loc.lat !== 0) {
      fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${loc.lat}&lon=${loc.lon}&units=metric&appid=${api_key}`
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
          }
          return response.json()
        })
        .then((data) => {
          const dailyForecast = data.list
            .filter((reading: { dt_txt: string }) =>
              reading.dt_txt.includes("12:00:00")
            )
            .slice(0, 5)
          setForecast(dailyForecast)
        })
        .catch((error) => console.error("Error:", error))
    }
  }, [loc])

  useEffect(() => {
    if (loc.lon !== 0 && loc.lat !== 0) {
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${loc.lat}&lon=${loc.lon}&units=metric&appid=${api_key}`
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
          }
          return response.json()
        })
        .then((data) => {
          const convertUnixToTime = (unix: number, timezone: number) => {
            const date = new Date((unix + timezone) * 1000)
            return date.toUTCString().slice(-12, -7)
          }

          setWeather({
            temp: +data.main.temp.toFixed(1),
            temp_max: +data.main.temp_max.toFixed(1),
            temp_min: +data.main.temp_min.toFixed(1),
            feels_like: +data.main.feels_like.toFixed(1),
            location: data.name + ", " + data.sys.country,
            humidity: data.main.humidity,
            pressure: data.main.pressure,
            wind_angle: data.wind.deg,
            wind_speed: data.wind.speed,
            weather: data.weather[0].description,
            weather_icon: data.weather[0].icon,
            timezone: data.timezone,
            sunrise: convertUnixToTime(data.sys.sunrise, data.timezone),
            sunset: convertUnixToTime(data.sys.sunset, data.timezone),
          })
        })
        .catch((error) => console.error("Error:", error))
    }
  }, [loc])

  return (
    <div className="search-container">
      <div className="weather-info container d-flex flex-column">
        <div className="row">
          <div className="col d-flex align-items-start flex-column">
            <h2>Weather in</h2>
            <h1 className="display-2 text-decoration-underline">
              {weather.location}
            </h1>
            <h3 className="weather-icon">
              <img
                src={`https://openweathermap.org/img/wn/${weather.weather_icon}@2x.png`}
                alt="Experiencing"
              />{" "}
              {weather.weather}
            </h3>
          </div>
          <div className="col">
            <div className="container d-flex flex-column text-end">
              <div className="row">
                <div
                  style={{
                    filter: `drop-shadow(0px 0px 10px rgb(${getColorForTemperature(weather.temp)}`,
                  }}
                  className="col d-flex justify-content-end"
                >
                  <h1 className="temp-display display-1">{weather.temp}°C</h1>
                </div>
              </div>
              <hr className="line" />
              <div className="row">
                <div className="col">
                  <div className="display-6">
                    <i className="bi bi-thermometer-low"></i> {weather.temp_min}
                    °C | <i className="bi bi-thermometer-high"></i>{" "}
                    {weather.temp_max}°C
                  </div>
                  <p className="text-secondary">
                    <i>Feels like {weather.feels_like}°C</i>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr className="line" />
      <div className="sunset-sunrise container display-6 justify-content-center d-flex flex-col align-items-center">
        <div className="row d-flex align-items-center">
          <div className="col d-flex justify-content-center">
            <p>
              <i className="bi bi-sunrise"></i>
            </p>
            <p>{weather.sunrise}</p>
          </div>
          <div className="col d-flex justify-content-center">
            <i className="bi bi-arrow-right"></i>
          </div>
          <div className="col d-flex justify-content-center">
            <p>
              <i className="bi bi-sunset"></i>
            </p>
            <p>{weather.sunset}</p>
          </div>
        </div>
      </div>
      <div className="container weather-details d-flex justify-content-center gap-5">
        <div className="container display-6 justify-content-center d-flex">
          <div className="col d-flex justify-content-center">
            <div className="row">
              <p>
                <img
                  src="../../public/arrow.png"
                  style={{
                    transform: `rotate(${weather.wind_angle}deg)`,
                    width: "1em",
                    margin: "0.1em",
                  }}
                  alt=""
                />
                {weather.wind_angle}°
              </p>
            </div>
          </div>
          <div className="col d-flex justify-content-center">
            <div className="row">
              <p>
                <i className="bi bi-wind"></i> {weather.wind_speed} m/s
              </p>
            </div>
          </div>
        </div>
        <div className="container display-6 justify-content-center d-flex flex-col align-items-center">
          <div className="col d-flex justify-content-center">
            <div className="row">
              <p>
                <i className="bi bi-moisture"></i> {weather.humidity}%
              </p>
            </div>
          </div>
          <div className="col d-flex justify-content-center">
            <div className="row">
              <p>
                <i className="bi bi-hurricane"></i> {weather.pressure} hPa
              </p>
            </div>
          </div>
        </div>
      </div>

      <hr className="line" />

      <div className="forecast container d-flex justify-content-center gap-3">
        {forecast.map(({ dt_txt, main, weather }: Schedule) => (
          <div
            key={dt_txt}
            className="forecast-item d-flex flex-column align-items-center"
          >
            <p>{dt_txt.slice(5, 10)}</p>
            <h3
              style={{
                filter: `drop-shadow(0px 0px 10px rgb(${getColorForTemperature(main.temp)}`,
              }}
            >
              {main.temp}°C
            </h3>
            <p className="text-center">
              Feels like <br /> {main.feels_like}°C
            </p>
            <img
              src={`https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`}
              alt=""
            />
            {weather[0].main}
          </div>
        ))}
      </div>
    </div>
  )
}

export default WeatherData
