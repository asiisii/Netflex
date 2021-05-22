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
        <Route exact path='/' component = {Home}/>
        <Route render= {() => <h1>Page Not Found</h1>} />
      </Switch>
    </div>
  )
  
}

export default App;
