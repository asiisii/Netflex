import React from 'react'
import './MovieInfo.css'

export default function MovieInfo({movie, videoKey, handleClick}) {
  return (
    <section className="poster-section"
      style={
        { backgroundImage: `url(${movie.backgroundImg})` }
      }
    >
      <article className="glass"> 
        <div className='details'>
          {(!movie.title || !movie.avgRating || !movie.genres || !movie.overview
          || !movie.hr || !movie.mins || !movie.releaseDate) && 
          <h1 className="poster-title"> 
            No Information Available. <br/>BLAME COVID-19  
          </h1>
          }
          {movie.title && movie.avgRating && movie.genres && movie.overview
          && movie.hr && movie.mins && movie.releaseDate &&
            <>
              <h1 className="poster-title"> 
                {movie.title} 
              </h1>
              <p className="genre">{movie.genres}</p>
              <p className="overview">{movie.overview} </p>
              <div className="stats">
                <span className='runtime'>
                  <h4>Runtime</h4>
                  <p>{movie.hr}hrs {movie.mins}mins</p> 
                </span>
                <span className="release-date">
                  <h4>Release date</h4>
                  <p>{movie.releaseDate}</p>
                </span>
                <span className="rating">
                  <h4>Rating</h4>
                  <p>{movie.avgRating}/10</p>
                </span> 
              </div> 
            </>
          }
        </div>
        <footer className='btm-menu'>
          <button className='close-info-btn' onClick={handleClick}>Go back</button>
        </footer>
        {!videoKey.hasLink && 
          <div className='trailer-container'> 
          <img
           className='trailer'
           title="YouTube video player"
           src={videoKey.videoLink}
           alt="video unaviable logo"> 
         </img> 
       </div>
        }
        {videoKey.hasLink &&
          <div className='trailer-container'> 
            <iframe
              className='trailer'
              title="YouTube video player"
              src={videoKey.videoLink}>  
            </iframe> 
          </div>  
        }
      </article>
    </section>
  )
}