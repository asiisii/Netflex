import React from 'react'
import Header from '../Header/Header'
import Preview from '../Preview/Preview'
import Movies from '../Movies/Movies'
import MovieInfo from '../MovieInfo/MovieInfo'

import apiCalls from '../../apiData/apiCalls'
import cleanApiData from '../../apiData/utilities'
import './App.css'
import { gsap, Back } from 'gsap'
class App extends React.Component {
  constructor() {
    super()
    this.state = {
      movies: '',
      poster: '',
      video: '',
      error: '',
      effect: gsap.timeline(),
      isActive: true
    }
  }

  displayPoster = id => {
    apiCalls.fetchAMovie(id)
      .then(data => this.setState({
        poster: cleanApiData.getAMovie(data)
      }))
      .catch(() => this.setState({error: 'Request failed!'}))
    apiCalls.fetchVideos(id)
      .then(data => {
        this.setState({
          video: cleanApiData.getVideoInfo(data)
        })
        this.handleAnimation()
      })
      .catch(() => this.setState({error: 'Request failed!'}))
  }

  handleAnimation = () => {
    this.setState({isActive: false})
    this.state.effect.from('.poster-section', { ease: Back.easeOut, x: -1990, duration: 1.5}) 
  }

  hidePoster = () => {
    this.setState({isActive: true})
    this.state.effect.from('.wrapper', { ease: Back.easeOut, x: 2990, duration: 1.5}) 
  }

  componentDidMount = () => {
    apiCalls.fetchAllMovies()
      .then(data => this.setState({
        movies: cleanApiData.getAllMovies(data)
      }))
      .catch(() => this.setState({error: 'Request failed!!'}))
    
    // .then(data => this.setState({movies: data.movies}))
  }

  render() {
    return (
      <div className="app">
          {this.state.poster && !this.state.isActive &&
            <MovieInfo 
            poster={this.state.poster} 
            videoKey={this.state.video}
            handleClick={this.hidePoster}
            />
          } 
        <div className="wrapper">
          {this.state.isActive &&
            <>
              <Header />
                <main className="home">
                  <Preview className="preview" />
                  {this.state.error && <h2>{this.state.error}</h2>}
                  {!this.state.error && !this.state.movies.length && <h2>💪Loading Your Movies💪</h2>}
                  {this.state.movies.length && !this.state.error &&
                    <Movies 
                      movies={this.state.movies} 
                      display={this.displayPoster}
                    />
                  }   
                </main>
            </>
          }
         </div> 
      </div>
    )
  }
}

export default App;
