import { useEffect, useState } from "react"

function Home() {
  const category = "nature"
  const [img, setImg] = useState("")

  useEffect(() => {
    fetch("https://api.api-ninjas.com/v1/randomimage?category=" + category, {
      headers: {
        "X-Api-Key": "BxJY/hAn8fZwf4C7jpeHtg==ayRrQ35KtXHH1Q06",
        Accept: "image/jpg",
      },
    })
      .then((response) => response.blob())
      .then((blob) => {
        setImg(URL.createObjectURL(blob))
      })
  }, [category])

  return (
    <>
      <div className="main-page-container container text-center d-flex flex-column justify-content-center align-items-center">
        <img src={img} alt="Background Image" />
        <div className="row align-items-center justify-content-center">
          <div className="col text-center">
            <h1 className="border border-secondary-subtle border-2 hero-left display-2 bg-secondary-subtle">
              Welcome to the Weather App.
            </h1>
          </div>
          <div className="col text-center">
            <h2 className="border border-secondary-subtle border-2 hero-right display-6 fs-3 bg-secondary-subtle">
              A simple application that uses an API to fetch weather data of
              your favourite places on Earth.
            </h2>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col text-center">
            <h2 className="border border-secondary-subtle border-4 hero-bottom bg-secondary-subtle fst-italic text-decoration-underline">
              Use the search tab to get started.
            </h2>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
