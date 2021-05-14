import React from 'react'
import './MoviePoster.css'

export default function MoviePoster(props) {
  return (
    <div id={props.id} className='movie-poster'>
      <img 
      className='poster-image'
      src={props.image} 
      alt={`${props.title} poster`} 
      onClick={() => props.display(props.id)}
      />
    </div>
  )
}