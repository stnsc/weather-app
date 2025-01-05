import { Link, useNavigate } from "react-router-dom"

function Navbar() {
  return (
    <>
      <nav className="navbar navbar-expand-md fixed-top bg-body-secondary">
        <div className="container-fluid">
          <div className="d-flex flex-column w-100 text-center">
            <a className="navbar-brand" href="#">
              Weather App
            </a>
            <button
              className="navbar-toggler collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarToggler"
              aria-controls="navbarToggler"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarToggler">
              <ul className="nav navbar-nav mx-auto">
                <Link to="/" className="nav-item">
                  <a className="nav-link" href="#">
                    Home
                  </a>
                </Link>
                <Link to="/search" className="nav-item">
                  <a className="nav-link" href="#">
                    Search
                  </a>
                </Link>
                <Link to="/fav" className="nav-item">
                  <a className="nav-link" href="#">
                    Favourites
                  </a>
                </Link>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar
