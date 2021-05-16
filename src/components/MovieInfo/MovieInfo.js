import React from 'react'
import './MovieInfo.css'

function getVideoKey(videoInfo) {
  if (videoInfo.length) {
    const getVideo = videoInfo.find(video => video.type === 'Trailer')
    const key = getVideo.key
    return (
      <div className='trailer-container'> 
        <iframe
          className='trailer'
          title="YouTube video player"
          src={`https://www.youtube.com/embed/${key}`}> 
          
        </iframe> 
      </div>)
  }
  else {
    return (
      <div className='trailer-container'> 
        <img 
        className='trailer' 
        src="https://i.insider.com/5b0d4c731ae6622f008b4f81?" 
        alt="video unaviable logo" />
      </div>)
  }
}

export default function MovieInfo(props) {
  let hr = parseInt(props.poster.runtime / 60)
  let m = props.poster.runtime % 60
  m = m < 10 ? '0' + m : m
  let date = props.poster.release_date.split('-')
  let yyyy = date[0]
  let mm = date[1]
  let dd = date[2]
  date = `${mm}/${dd}/${yyyy}`
  let genres =  props.poster.genres.join(' | ')
  let rating = props.poster.average_rating.toFixed(1)
  return (
    <section className="poster-section"
      style={{
        backgroundImage: `url(${props.poster.backdrop_path})`
      }}
    >
      <article className="glass"> 
        <div className='details'>
          {(!props.poster.title || !rating || !genres || !props.poster.overview
          || !hr || !m || !date) && 
          <h1 className="poster-title"> 
            No Information Available 
          </h1>
          }

          {props.poster.title && rating && genres && props.poster.overview
            && hr && m && date && 
            <>
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
                  <p>{date}</p>
                </span>
                <span className="rating">
                  <h4>Rating</h4>
                  <p>{rating}/10</p>
                </span> 
              </div> 
            </>
          }
        </div>
        <footer className='mobile-btm-menu'>
          <button className='mobile-close-info-btn' onClick={props.handleClick}>Go back</button>
        </footer>
        {!props.videoKey.videos && console.log('error')}
        {props.videoKey.videos &&
          getVideoKey(props.videoKey.videos)}
      </article>
    </section>
  )
}