import { Link } from "react-router-dom"

function Navbar() {
  return (
    <>
      <nav className="navbar fixed-bottom navbar-expand-md bg-body-secondary">
        <div className="container-fluid">
          <div className="d-flex flex-column w-100 text-center">
            <a className="navbar-brand m-0" href="#">
              Weather App | Stanescu Vladut George
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
                <Link to="/" className="nav-item ">
                  <div className="nav-link">
                    <i className="bi bi-house-fill"></i> Home
                  </div>
                </Link>

                <Link to="/search" className="nav-item ">
                  <div className="nav-link">
                    <i className="bi bi-search"></i> Search
                  </div>
                </Link>

                <Link to="/favourites" className="nav-item ">
                  <div className="nav-link">
                    <i className="bi bi-stars"></i> Favourites
                  </div>
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
