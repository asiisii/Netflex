import React from 'react'
import Header from '../Header/Header'
import Preview from '../Preview/Preview'
import Movies from '../Movies/Movies'
import MovieInfo from '../MovieInfo/MovieInfo'

import apiCalls from '../../apiCalls'
// import './App.css'
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
      .then(data => this.setState({poster: data.movie}))
      .catch(() => this.setState({error: 'OOPSYYY!'}))
    apiCalls.fetchVideos(id)
      .then(data => {
        this.setState({video: data})
        this.handleAnimation()
      })
      .catch(() => this.setState({error: 'OOPSYYY!'}))
    
  }

  handleAnimation = () => {
    this.setState({isActive: false})
    this.state.effect.from('.poster-section', { ease: Back.easeOut, x: -990, duration: 2}) 
    // this.state.effect.to('.home', { ease: Back.easeOut, x: 1990 })
    // this.state.effect.to('.preview', { ease: Back.easeOut, x: 1990 })
    // this.state.effect.to('.header', { ease: Back.easeOut, x: 1990 })
     // this.state.t1.from('.pokemon', { rotation: -360, transformOrigin: "center" });preview
    // this.setState({
    //   movies: ''
    // })
  }

  hidePoster = () => {
    this.setState({isActive: true})
    // this.state.effect.reverse()
    // this.setState({ 
    //   poster: '',
    //   video: '' 
    // })
  }

  componentDidMount = () => {
    apiCalls.fetchAllMovies()
      .then(data => this.setState({movies: data.movies}))
      .catch(() => this.setState({error: 'OOPS!'}))
  }

  // clearError = () => {
  //   return this.state.error ?  this.setState({error: ''}) : true
  // }

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
    )
  }
}

export default App;
