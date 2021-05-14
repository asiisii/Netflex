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
      error: ''
    }
  }

  displayPoster = id => {
    apiCalls.fetchAMovie(id)
      .then(data => this.setState({poster: data.movie}))
      .catch(() => this.setState({error: 'OOPSYYY!'}))
  }

  componentDidMount = () => {
    apiCalls.fetchAllMovies()
      .then(data => this.setState({movies: data.movies}))
      .catch(() => this.setState({error: 'OOPS!'}))
  }

  render() {
    return (
      <div className="app">
        <Header />
        <main>
          <Preview className="preview" />
          {this.state.error && <h2>{this.state.error}</h2>}
          {!this.state.error && !this.state.movies.length && <h2>💪Loading Your Movies💪</h2>}
          {this.state.movies.length && 
            <Movies 
              movies={this.state.movies} 
              display={this.displayPoster}
            />
          }    
        </main>
        {this.state.error && <h2>{this.state.error}</h2>}
        {this.state.poster && <MovieInfo poster={this.state.poster} />}
      </div>
    )
  }
}

export default App;
