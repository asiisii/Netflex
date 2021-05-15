import React from 'react'
import './MovieInfo.css'

export default function MovieInfo(props) {
  let hr = parseInt(props.poster.runtime / 60)
  let m = props.poster.runtime % 60
  m = m < 10 ? '0' + m : m
  let splittedDate = props.poster.release_date.split('-')
  let date = [...splittedDate]
  { [date[0], date[1], date[2]] = [date[1], date[2], date[0]] }
  let genres =  props.poster.genres.join(' | ')
  return (
    <section className="poster-section"
      style={{
        backgroundImage: "url(" + `${props.poster.backdrop_path}` + ")"
      }}
    >
      <article className="glass"> 
        <div className='details'>
          <h1 className="poster-title"> 
            {props.poster.title} 
          </h1>
          <p className="genre">{genres}</p>
          <p className="overview">{props.poster.overview} </p>
          <div className="stats">
            <span className='runtime'>
              <h4>Runtime</h4>
              <p>{hr}hrs {m}mins</p> 
            </span>
            <span className="release-date">
              <h4>Release date</h4>
              <p>{date.join('/')}</p>
            </span>
            <span className="rating">
              <h4>Rating</h4>
              {props.poster.average_rating.toFixed(0)}/10
            </span> 
          </div> 
        </div>
        {/* {!props.videoKey && console.log('error')}
        {setTimeout(() => {
          console.log(props.videoKey);
        }, 2000)} */}
        {props.videoKey &&
          <div className='trailer-container'>
            <iframe
              // width="560"
              // height="315"
              className='trailer'
              src={`https://www.youtube.com/embed/${props.videoKey}`}>
          </iframe>
          </div>}
      </article>
    </section>
  )
}