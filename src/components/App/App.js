import React from 'react'
import { Route } from 'react-router-dom'

import Home from '../Home/Home'
import MovieInfo from '../MovieInfo/MovieInfo'

import './App.css'

function App() {
  return (
    <div className="app">
      <Route
        exact path='/movies/:id'
        render={({ match }) => {
          return (
            <MovieInfo 
              id={match.params.id}
            />
          ) 
        }}
      />
      <Route
        exact path='/'
        component={ Home }
      />
    </div>
  )
}

export default App;
