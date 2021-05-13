import React from 'react'
import Header from '../Header/Header'
import Preview from '../Preview/Preview'
import Movies from '../Movies/Movies'
import MovieInfo from '../MovieInfo/MovieInfo'

import {movieData, posterData} from '../../movieData'

import './app.css'

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      movies: movieData.movies,
      poster: posterData.movie
    }
  }

  render() {
    return (
      <div className="app">
        <Header />
        <main>
          <Preview className="preview" />
          <Movies movies={this.state.movies} />
        </main>
        {/* <MovieInfo poster={this.state.poster} /> */}
      </div>
    )
  }
}

export default App;
