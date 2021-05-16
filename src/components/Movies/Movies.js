import React from 'react'

import MoviePoster from '../MoviePoster/MoviePoster'
import './movies.css'

export default function Movies(props) {
  // console.log(props.movies);
    const posters = props.movies.map(movie => {
      return (
        <MoviePoster
          key={movie.id}
          id={movie.id}
          // title={movie.title}
          image={movie.poster}
          display={props.display}
        />
      )
    })
  
  return (
    <div className='movie-catalogue'>
      <h1 className='results-title'>All Movies</h1>
      <section className='movie-grid'>
        {posters}
      </section>
    </div>
  )
}
