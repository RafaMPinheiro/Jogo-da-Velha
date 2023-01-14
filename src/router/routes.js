import React from 'react'

import Home from '../pages/Home'
import Game from '../pages/Game'

import { BrowserRouter, Route, Routes } from 'react-router-dom'

const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route exact path="/" component={Home} />
      <Route exact path="/game" component={Game} />
    </Routes>
  </BrowserRouter>
)

export default Router
