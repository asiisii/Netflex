import React from 'react'
import { Link } from 'react-router-dom'
import './MoviePoster.css'

export default function MoviePoster({id, image, title}) {
  return (
    <Link
      to={`/movies/${id}`} 
      id={id} 
      className='movie-poster'
    >
      <img 
        className='poster-image'
        src={image} 
        alt={`${title} poster`} 
      />
    </Link>
  )
}
