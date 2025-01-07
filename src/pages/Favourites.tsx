import { useEffect, useState } from "react"
import { motion } from "framer-motion"

interface WeatherData {
  location: string
  temp: number
  description: string
  weather: string
  weather_icon: string
}

interface Location {
  lat: number
  lon: number
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 2,
      when: "beforeChildren",
    },
  },
}

const cardVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.2 } },
}

const getColorForTemperature = (temp: number) => {
  const startColor = [0, 225, 255] // Light blue (RGB)
  const endColor = [255, 165, 0] // Orange (RGB)
  const ratio = temp / 30

  const r = Math.round(startColor[0] + ratio * (endColor[0] - startColor[0]))
  const g = Math.round(startColor[1] + ratio * (endColor[1] - startColor[1]))
  const b = Math.round(startColor[2] + ratio * (endColor[2] - startColor[2]))

  return `${r},${g},${b}`
}

function Favourites() {
  const [weatherData, setWeatherData] = useState<WeatherData[]>([])

  useEffect(() => {
    const fetchWeatherData = async () => {
      const cities = JSON.parse(localStorage.getItem("favourites") || "[]")
      const weatherPromises = cities.map((loc: Location) =>
        fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${loc.lat}&lon=${loc.lon}&units=metric&appid=${import.meta.env.VITE_API_KEY}`
        ).then((response) => response.json())
      )
      const weatherResponses = await Promise.all(weatherPromises)
      const weatherData = weatherResponses.map((data) => ({
        location: data.name + ", " + data.sys.country,
        temp: data.main.temp,
        description: data.weather[0].description,
        weather: data.weather[0].description,
        weather_icon: data.weather[0].icon,
      }))
      setWeatherData(weatherData)
    }

    fetchWeatherData()
  }, [])

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible">
      {weatherData.map((data, index) => (
        <motion.div
          key={index}
          variants={cardVariants}
          className="container fav-card align-items-center text-align-center"
        >
          <div className="row">
            <div className="col d-flex align-items-start flex-column ">
              <div className="fav-loc">
                <h1 className="display-5 text-decoration-underline">
                  {data.location}
                </h1>
                <h3 className="weather-icon">
                  <img
                    src={`https://openweathermap.org/img/wn/${data.weather_icon}@2x.png`}
                    alt="Experiencing"
                  />{" "}
                  {data.weather}
                </h3>
              </div>
            </div>
            <div className="col d-flex align-items-center">
              <div className="container d-flex flex-column text-end">
                <div className="row">
                  <div
                    style={{
                      filter: `drop-shadow(0px 0px 10px rgb(${getColorForTemperature(data.temp)}`,
                    }}
                    className="col d-flex justify-content-end"
                  >
                    <h1 className="temp-display display-1">{data.temp}°C</h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  )
}

export default Favourites
