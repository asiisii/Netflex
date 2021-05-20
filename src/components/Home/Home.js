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
      filteredMovies: [],
      error: '',
      effect: gsap.timeline()
    }
  }

  filterMovies = (e) => {
    this.setState({ error: '' })

    let filteredMovies;
    const query = e.target.value.toLowerCase();

    if (query) {
      filteredMovies = this.state.movies.filter(movie => movie.title.toLowerCase().includes(query))

      if (!filteredMovies.length) {
        this.setState({ error: 'No movies found.'})
      } 
    } else {
      filteredMovies = [];
    }
    
    this.setState({ filteredMovies })
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
      .catch(() => this.setState({error: 'Request failed!!'}))
  }

  render() {
    return (
      <div className="home">
        <Header handleChange={this.filterMovies}/>
        <main>
          {!this.state.filteredMovies.length && <Preview className="preview" />}
          {this.state.error && <h2>{this.state.error}</h2>}
          {!this.state.error && !this.state.movies.length && 
          <h2 className="loading">
            💪Loading Your Movies💪
          </h2>}
          {this.state.movies.length && !this.state.error &&
            <Movies 
              movies={this.state.filteredMovies.length ? this.state.filteredMovies : this.state.movies} 
              display={this.displayAMovie}
            />
          }   
        </main>
      </div>
    )
  }
}