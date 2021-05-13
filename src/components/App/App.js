import React from 'react'
import Header from '../Header/Header'
import Preview from '../Preview/Preview'
import Movies from '../Movies/Movies'

import movieData from '../../movieData'

import './app.css';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      movies: movieData.movies
    }
  }

  render() {
    return (
      <div className="App">
        <Header />
        <Preview className="preview"/>
        <Movies movies={this.state.movies} />
      </div>
    )
  }
}

export default App;
