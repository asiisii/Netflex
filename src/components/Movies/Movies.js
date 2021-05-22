import React from 'react'

import MoviePoster from '../MoviePoster/MoviePoster'
import './movies.css'

export default function Movies(props) {
  const posters = props.movies.map(movie => {
    return (
      <MoviePoster
        key={movie.id}
        id={movie.id}
        title={movie.title}
        image={movie.poster}
        display={props.display}
        // handleClick={props.handleClick}
      />
    )
  })
  
  return (
    <div className={`movie-catalogue ${props.className}`}>
      <h1 className='results-title'>{props.title}</h1>
      {props.error && <p className='search-error'>No movies found. Please refine your search.</p>}
      <section className='movie-grid'>
        {posters}
      </section>
    </div>
  )
}
