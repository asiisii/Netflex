import React from 'react'
import { NavLink } from 'react-router-dom'
import apiCalls from '../../apiData/apiCalls'
import cleanApiData from '../../apiData/utilities'
import { gsap, Back } from 'gsap'
import './MovieInfo.css'

export default class MovieInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.id,
      movieDetails: '',
      video: '',
      effect: gsap.timeline(),
      statusCode: 200,
      fetchedError: false
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
    
    const movie = `/movies/${this.state.id}`
    const video = `${movie}/videos`

    apiCalls.fetchApiData(movie)
      .then(res => {
        this.setState({statusCode: res.status})
        return res.json()
      })
      .then(data => {
        this.setState({
          movieDetails: cleanApiData.cleanSingleMovieData(data)
        })
       return !this.state.movieDetails ? this.setState({error: 'Request failed!'}) : this.state.movieDetails
      })
      .then(() => this.handleError(this.state.movieDetails.id))
      .catch(() => this.setState({ fetchedError: true}))

    apiCalls.fetchApiData(video)
      .then(res => {
        this.setState({statusCode: res.status})
        return res.json()
      })
      .then(data => {
        this.setState({
          video: cleanApiData.getVideoInfo(data)
        })
      })
      .catch(() => this.setState({fetchedError: true}))
  }

  render() {
    const {id, movieDetails, video, statusCode, fetchedError} = this.state
    return (
      <>
        <section className="poster-section"
          style={
            { backgroundImage: `url(${movieDetails.backgroundImg})` }
          }
        >
          {!movieDetails && !fetchedError &&
          <article className="glass-msg">
            <h1>💪Loading...💪</h1>
          </article>
          }
          {fetchedError && !movieDetails &&
            <article className="glass-msg">
              {apiCalls.checkForError(this.state.statusCode)}
            </article>
          }
          {movieDetails && video && 
            this.state.id.split('').length === 6 && 
            <article className="glass"> 
              <div className='details'>
                {(!movieDetails.title || !movieDetails.avgRating || !movieDetails.genres || !movieDetails.overview
                || !movieDetails.hr || !movieDetails.mins || !movieDetails.releaseDate) && 
                <h1 className="poster-title"> 
                  No Information Available. <br/>BLAME COVID-19  
                </h1>
                }
                {movieDetails.title && movieDetails.avgRating && movieDetails.genres && movieDetails.overview
                && movieDetails.hr && movieDetails.mins && movieDetails.releaseDate &&
                  <>
                    <h1 className="poster-title"> 
                      {movieDetails.title} 
                    </h1>
                    <p className="genre">{movieDetails.genres}</p>
                    <p className="overview">{movieDetails.overview} </p>
                    <div className="stats">
                      <span className='runtime'>
                        <h4>Runtime</h4>
                        <p>{movieDetails.hr}hrs {movieDetails.mins}mins</p> 
                      </span>
                      <span className="release-date">
                        <h4>Release date</h4>
                        <p>{movieDetails.releaseDate}</p>
                      </span>
                      <span className="rating">
                        <h4>Rating</h4>
                        <p>{movieDetails.avgRating}/10</p>
                      </span> 
                    </div> 
                  </>
                }
              </div>
              <footer className='btm-menu'>
                <NavLink 
                  to='/'
                  className='close-info-btn'
                >Go back
                </NavLink>
              </footer>
              {!video.hasLink && 
                <div className='trailer-container'> 
                <img
                  className='trailer'
                  title="YouTube video player"
                  src={video.videoLink}
                  alt="video unaviable logo"> 
                </img> 
              </div>
              }
              {video.hasLink &&
                <div className='trailer-container'> 
                  <iframe
                    className='trailer'
                    title="YouTube video player"
                    src={video.videoLink}>  
                  </iframe> 
                </div>  
              }
            </article>
          }
        </section>
      </>
    )
  }
}