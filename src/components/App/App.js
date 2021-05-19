import React from 'react'
import { Route } from 'react-router-dom'
import { gsap, Back } from 'gsap'
import Header from '../Header/Header'
import Movies from '../Movies/Movies'
import Preview from '../Preview/Preview'
import apiCalls from '../../apiData/apiCalls'
import MovieInfo from '../MovieInfo/MovieInfo'
import cleanApiData from '../../apiData/utilities'
import './App.css'

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      movies: '',
      error: '',
      effect: gsap.timeline(),
    }
  }

  // handleAnimation = () => {
  //   this.setState({isActive: false})
  //   this.state.effect.from('.poster-section', 
  //   { ease: Back.easeOut, x: -1990, duration: 1.5})
  // }

  hidemovie = () => {
    this.setState({isActive: true})
    this.state.effect.from('.wrapper', 
    { ease: Back.easeOut, x: 2990, duration: 1.5}) 
  }

  componentDidMount = () => {
    apiCalls.fetchApiData('movies')
      .then(data => this.setState({
        movies: cleanApiData.getAllMovies(data)
      }))
      .catch(() => this.setState({error: 'Request failed!!'}))
  }

  render() {
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
          render={() => {
            return (
              <div className="wrapper">
                <Header />
                <main className="home">
                  <Preview className="preview" />
                  {this.state.error && <h2>{this.state.error}</h2>}
                  {!this.state.error && !this.state.movies.length && 
                  <h2 className="loading">
                    💪Loading Your Movies💪
                  </h2>}
                  {this.state.movies.length && !this.state.error &&
                    <Movies 
                      movies={this.state.movies} 
                      display={this.displayAMovie}
                    />
                  }   
                </main>
              </div> 
            )
          }}
        />
      </div>
    )
  }
}

export default App;
