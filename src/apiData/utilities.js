// import apiCalls from './apiCalls'

const cleanApiData = {
  getAllMovies: (data) => {
    return data.movies.map(movie => {
      return {
        id: movie.id,
        poster: movie.poster_path
      }
    })
  },

  getAMovie: (data) => {
   const movieInfo = data.movie
   let hr = parseInt(movieInfo.runtime / 60)
   let m = movieInfo.runtime % 60
   m = m < 10 ? '0' + m : m
   let date = movieInfo.release_date.split('-')
   let yyyy = date[0]
   let mm = date[1]
   let dd = date[2]
   date = `${mm}/${dd}/${yyyy}`
   let genres =  movieInfo.genres.join(' | ')
   let rating = movieInfo.average_rating.toFixed(1)
    return {
      id: movieInfo.id,
      title: movieInfo.title,
      backgroundImg: movieInfo.backdrop_path,
      releaseDate: date,
      overview: movieInfo.overview,
      genres: genres,
      hr: hr,
      mins: m,
      avgRating: rating
    }
  }
} 



export default cleanApiData;

