import React from 'react'

import Header from '../Header/Header'
import Movies from '../Movies/Movies'
import Preview from '../Preview/Preview'
import apiCalls from '../../apiData/apiCalls'
import cleanApiData from '../../apiData/utilities'
import { gsap, Back } from 'gsap'

export default class Home extends React.Component {
  constructor() {
    super();
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
    { ease: Back.easeOut, x: 2990, duration: 1.5}).then(() => {
      document.querySelector('.home').removeAttribute('style')
    })
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
    return (
      <div className="home">
        <Header handleChange={this.filterMovies} />
        <main>
          {this.state.error && this.state.error !== 'No movies found.' && <h2>{this.state.error}</h2>}
          {(this.state.filteredMovies.length || this.state.error === 'No movies found.') 
            ? <Preview className='closed'/> : <Preview className='opened' />
          }
          {!this.state.error && !this.state.movies.length && 
            <h2 className="loading">
              💪Loading Your Movies💪
            </h2>
          }
          {this.state.movies.length &&
            <Movies 
              title={(this.state.filteredMovies.length || this.state.error === 'No movies found.') 
                ? 'Search Results' : 'All Movies'
              }
              movies={(this.state.filteredMovies.length || this.state.error === 'No movies found.') 
                ? this.state.filteredMovies : this.state.movies
              } 
              display={this.displayAMovie}
              handleClick={() => this.props.handleClick(this.state.movies)}
              error={this.state.error}
            />
          }   
        </main>
      </div>
    )
  }
}
