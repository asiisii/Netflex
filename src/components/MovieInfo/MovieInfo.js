import React from 'react'
import { gsap, Back } from 'gsap'

import apiCalls from '../../apiData/apiCalls'
import cleanApiData from '../../apiData/utilities'
import './MovieInfo.css'

// {movie, videoKey, handleClick}

export default class MovieInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.id,
      movieDetails: '',
      video: '',
      effect: gsap.timeline()
    }
  }

  handleAnimation = () => {
    this.state.effect.from(
      '.poster-section',
      { ease: Back.easeOut, x: -1990, duration: 1.5 } 
    )
  }
  
  componentDidMount() {
    this.handleAnimation();

    const movie = `movies/${this.state.id}`
    const video = `${movie}/videos`

    apiCalls.fetchApiData(movie)
      .then(data => {
        this.setState({
          movieDetails: cleanApiData.getAMovie(data)
        })
        
      })
      .catch(() => this.setState({error: 'Request failed!'}))

    apiCalls.fetchApiData(video)
      .then(data => {
        this.setState({
          video: cleanApiData.getVideoInfo(data)
        })
      })
      .catch(() => this.setState({error: 'Request failed!'}))
  }

  render() {
    return (
      <section className="poster-section"
        style={
          { backgroundImage: `url(${this.state.movieDetails.backgroundImg})` }
        }
      >
        <article className="glass"> 
          <div className='details'>
            {(!this.state.movieDetails.title || !this.state.movieDetails.avgRating || !this.state.movieDetails.genres || !this.state.movieDetails.overview
            || !this.state.movieDetails.hr || !this.state.movieDetails.mins || !this.state.movieDetails.releaseDate) && 
            <h1 className="poster-title"> 
              No Information Available. <br/>BLAME COVID-19  
            </h1>
            }
            {this.state.movieDetails.title && this.state.movieDetails.avgRating && this.state.movieDetails.genres && this.state.movieDetails.overview
            && this.state.movieDetails.hr && this.state.movieDetails.mins && this.state.movieDetails.releaseDate &&
              <>
                <h1 className="poster-title"> 
                  {this.state.movieDetails.title} 
                </h1>
                <p className="genre">{this.state.movieDetails.genres}</p>
                <p className="overview">{this.state.movieDetails.overview} </p>
                <div className="stats">
                  <span className='runtime'>
                    <h4>Runtime</h4>
                    <p>{this.state.movieDetails.hr}hrs {this.state.movieDetails.mins}mins</p> 
                  </span>
                  <span className="release-date">
                    <h4>Release date</h4>
                    <p>{this.state.movieDetails.releaseDate}</p>
                  </span>
                  <span className="rating">
                    <h4>Rating</h4>
                    <p>{this.state.movieDetails.avgRating}/10</p>
                  </span> 
                </div> 
              </>
            }
          </div>
          <footer className='btm-menu'>
            <button 
              className='close-info-btn' 
              // onClick={handleClick}
            >Go back
            </button>
          </footer>
          {!this.state.video.hasLink && 
            <div className='trailer-container'> 
            <img
             className='trailer'
             title="YouTube video player"
             src={this.state.video.videoLink}
             alt="video unaviable logo"> 
           </img> 
         </div>
          }
          {this.state.video.hasLink &&
            <div className='trailer-container'> 
              <iframe
                className='trailer'
                title="YouTube video player"
                src={this.state.video.videoLink}>  
              </iframe> 
            </div>  
          }
        </article>
      </section>
    )
  }
}