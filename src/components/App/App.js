import React from 'react'
import { Route, Switch } from 'react-router-dom'

import Home from '../Home/Home'
import MovieInfo from '../MovieInfo/MovieInfo'

import './App.css'

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      moviesIDList: ''
    }
  }
  getMoviesID = (movies) => {
    // console.log(movies);
    const movieIDs = movies.map(movie => movie.id)
    console.log(movieIDs);
  return this.setState({moviesIDList: movieIDs})
    // console.log(this.state.moviesIDList);
    // return movieIDs
   
  }
  render() {
    // const a = this.getMoviesID()
    // console.log(this.state.moviesIDList);
    const {moviesIDList} = this.state;
    return ( 
      <div className="app">
        <Switch>
        <Route
          exact path='/movies/:id'
          render={({ match }) => {
            const selectedID = parseInt(match.params.id, 10)
            // {!moviesIDList && console.log('<><><>')}
            // { moviesIDList ? <MovieInfo 
            //       id={selectedID}
            //     /> : console.log('<><><>') }
            // const matchedID = moviesIDList.find(movie => movie === selectedID)
            // console.log(matchedID);
            // const id = matchedID ? matchedID : selectedID
              // let a;
              // if (this.state.moviesIDList) {
              // a = this.state.moviesIDList.find(id => id === selectedID) 
              // console.log(a);
              // return a
              // }
              // console.log(a);
              // if (!a) {
              //   console.log('dammit');
              //   return <h1>Page Not found</h1>
              // } 
              // else {
                // console.log(a);
              return (
                <MovieInfo 
                  id={match.params.id}
                />
              ) 
              // } 
            // }
          }}
        />
        <Route
          exact path='/'
          render={() => {
            return (
              <Home handleClick={this.getMoviesID} />
            )
          }}
        />
        <Route render= {() => <h1>Page Not found</h1>} />
        </Switch>
      </div>
    )
  }
}


export default App;
