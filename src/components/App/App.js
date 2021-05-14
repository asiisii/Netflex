import React from 'react'
import Header from '../Header/Header'
import Preview from '../Preview/Preview'
import Movies from '../Movies/Movies'
import MovieInfo from '../MovieInfo/MovieInfo'

import apiCalls from '../../apiCalls'
import './App.css'

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      movies: '',
      poster: '',
      video: '',
      error: 'check error'
    }
  }

  displayPoster = id => {
    apiCalls.fetchAMovie(id)
      .then(data => this.setState({poster: data.movie}))
      .catch(() => this.setState({error: 'OOPSYYY!'}))
    apiCalls.fetchVideos(id)
      .then(data => this.setState({video: data.videos[0].key}))
      .then(data => console.log(this.state.video))
      .catch(() => this.setState({error: 'OOPSYYY!'}))
  }

  componentDidMount = () => {
    apiCalls.fetchAllMovies()
      .then(data => this.setState({movies: data.movies}))
      .catch(() => this.setState({error: 'OOPS!'}))
  }

  clearError = () => {
    return this.state.error ?  this.setState({error: ''}) : true
  }

  render() {
    return (
      <div className="app">
        <Header />
        <main>
          <Preview className="preview" />
          {this.state.error && <h2>{this.state.error}</h2>}
          {this.state.error && <h2>{this.state.error}</h2>}
          {!this.state.error && !this.state.movies.length && <h2>💪Loading Your Movies💪</h2>}
          {this.state.movies.length && this.clearError() &&
            <Movies 
              movies={this.state.movies} 
              display={this.displayPoster}
            />
          }   
          {this.state.poster && 
            <MovieInfo 
            poster={this.state.poster} 
            videoKey={this.state.video}
            />
          } 
        </main>
      </div>
    )
  }
}

export default App;
