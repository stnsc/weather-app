import { Link } from "react-router"

function Home() {
  return (
    <>
      <div className="main-page-container container text-center d-flex flex-column justify-content-center align-items-center">
        <img src={"../../public/home-bg.jpg"} alt="Background Image" />
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
            <Link
              to="/search"
              className="fs-2 border border-secondary-subtle border-4 hero-bottom bg-secondary-subtle fst-italic text-decoration-underline"
            >
              Search to get started.
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
