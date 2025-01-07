import * as React from "react"
import Home from "./pages/Home"
import Search from "./pages/Search"
import Favourites from "./pages/Favourites"
import { useLocation, useRoutes } from "react-router"
import { AnimatePresence } from "framer-motion"

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
    {
      path: "/favourites",
      element: <Favourites />,
    },
  ])

  const location = useLocation()

  if (!element) return null

  return (
    <AnimatePresence mode="wait" initial={false}>
      <div className="main-content">
        {React.cloneElement(element, { key: location.pathname })}
      </div>
    </AnimatePresence>
  )
}

export default App
