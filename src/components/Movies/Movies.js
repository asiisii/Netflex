import React from 'react'

import MoviePoster from '../MoviePoster/MoviePoster'
import './movies.css'

export default function Movies({movies, display, className, title, error}) {
  const posters = movies.map(movie => {
    return (
      <MoviePoster
        key={movie.id}
        id={movie.id}
        title={movie.title}
        image={movie.poster}
        display={display}
      />
    )
  })
  
  return (
    <div className={`movie-catalogue ${className}`}>
      <h1 className='results-title'>{title}</h1>
      {error && <p className='search-error'>No movies found. Please refine your search.</p>}
      <section className='movie-grid'>
        {posters}
      </section>
    </div>
  )
}
