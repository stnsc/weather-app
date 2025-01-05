import * as React from "react"
import Home from "./pages/Home"
import Search from "./pages/Search"
import { useLocation, useRoutes } from "react-router"

function App() {
  const element = useRoutes([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/search",
      element: <Search />,
    },
  ])

  const location = useLocation()

  if (!element) return null

  return (
    <>
      <div className="main-content">
        {React.cloneElement(element, { key: location.pathname })}
      </div>
    </>
  )
}

export default App
