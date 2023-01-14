import { createBrowserRouter } from 'react-router-dom'

import Game from './pages/Game'
import Home from './pages/Home'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/game',
    element: <Game />,
  },
])

export { router }
