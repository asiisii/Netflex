import React from 'react'

import Header from '../Header/Header'
import Movies from '../Movies/Movies'
import Preview from '../Preview/Preview'
import apiCalls from '../../apiData/apiCalls'
import cleanApiData from '../../apiData/utilities'
import { gsap, Back } from 'gsap'

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: '',
      error: '',
      effect: gsap.timeline()
    }
  }

  hidemovie = () => {
    this.state.effect.from('.home', 
    { ease: Back.easeOut, x: 2990, duration: 1.5}) 
  }

  componentDidMount = () => {
    this.hidemovie();

    apiCalls.fetchApiData('movies')
      .then(data => this.setState({
        movies: cleanApiData.getAllMovies(data)
      }))
      .catch(() => this.setState({error: 'Sorry! We can\'t find the page you\'re looking for...'}))
  }

  render() {
    console.log(this.state.error);
    return (
      <div className="home">
        <Header />
        <main>
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
  }
}