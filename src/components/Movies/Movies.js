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
        image={movie.poster_path}
      />
    )
  })

  return (
    <section>
      {posters}
    </section>
  )
}
