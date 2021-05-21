import React from 'react'
import { Link } from 'react-router-dom'
import './MoviePoster.css'

export default function MoviePoster(props) {
  return (
    <Link
      to={`/movies/${props.id}`} 
      id={props.id} 
      className='movie-poster'
    >
      <img 
        className='poster-image'
        src={props.image} 
        alt={`${props.title} poster`} 
        onClick={props.handleClick}
      />
    </Link>
  )
}
