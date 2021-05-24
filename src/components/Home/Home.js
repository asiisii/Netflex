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
    const query = e.target.value.toLowerCase()
    if (query) {
      filteredMovies = this.state.movies.filter(movie => movie.title.toLowerCase().includes(query))
      if (!filteredMovies.length) {
        this.setState({ error: 'No movies found.'})
      } 
    } else {
      filteredMovies = []
    }
    
    this.setState({ filteredMovies })
  }
  
  hidemovie = () => {
    this.state.effect.from('.home', 
    { ease: Back.easeOut, x: 2990, duration: 1.5})
    document.querySelector('.home').removeAttribute('style')
    this.setState({fetchedError: false})
  }

  componentDidMount = () => {
    this.hidemovie()

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
    const {movies, filteredMovies, error, fetchedError, statusCode } = this.state
    return (
      <div className="home">
        <Header handleChange={this.filterMovies} />
        <main>
          {error && error !== 'No movies found.' && <h2>{error}</h2>}
          {(filteredMovies.length || error === 'No movies found.') 
            ? <Preview className='closed'/> : <Preview className='opened' />
          }
          {fetchedError && apiCalls.checkForError(statusCode)}
          {!error && !movies.length && !fetchedError &&
            <h2 className="loading">
              Loading Your Movies
            </h2>
          }
          {movies.length && !fetchedError && 
            <Movies 
              title={(filteredMovies.length || error === 'No movies found.') 
                ? 'Search Results' : 'All Movies'
              }
              movies={(filteredMovies.length || error === 'No movies found.') 
                ? filteredMovies : movies
              } 
              display={this.displayAMovie}
              error={error}
            />
          }   
        </main>
      </div>
    )
  }
}
