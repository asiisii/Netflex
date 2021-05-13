import React from 'react'
import './moviePoster.css'

export default function MoviePoster(props) {
  return (
    <div id={props.id}>
      <img src={props.image} alt={`${props.title} poster`} />
    </div>
  )
}