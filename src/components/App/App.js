import React from 'react'
import { Route, Switch } from 'react-router-dom'

import Home from '../Home/Home'
import MovieInfo from '../MovieInfo/MovieInfo'

import './App.css'

function App() {

  return ( 
    <div className="app">
      <Switch>
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
        render={() => {
          return (
            <Home handleClick={getMovies} />
          )
        }}
      />
      <Route render= {() => <h1>Page Not found</h1>} />
      </Switch>
    </div>
  )
}

const getMovies = (movies) => {
  console.log(movies);
  return movies;
}

export default App;
