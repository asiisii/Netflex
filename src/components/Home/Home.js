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
      effect: gsap.timeline(),
      statusCode: 200,
      fetchedError: false
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
    this.setState({fetchedError: false})
  }

  componentDidMount = () => {
    this.hidemovie();

    apiCalls.fetchApiData('movies')
      .then(res => {
        this.setState({statusCode: res.status})
        return res.json()
      })
      .then(data => this.setState({
        movies: cleanApiData.cleanAllMoviesData(data)
      }))
      .catch(() => this.setState({
        fetchedError: true
      }))
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
          {this.state.fetchedError && apiCalls.checkForError(this.state.statusCode)}
          {!this.state.error && !this.state.movies.length && !this.state.fetchedError &&
            <h2 className="loading">
              💪Loading Your Movies💪
            </h2>
          }
          {this.state.movies.length && !this.state.fetchedError && 
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
