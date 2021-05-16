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
      genres: genres,
      overview: movieInfo.overview,
      backgroundImg: movieInfo.backdrop_path,
      hr: hr,
      mins: m,
      releaseDate: date,
      avgRating: rating
    }
  },

  getVideoInfo: (data) => {
    if (data.videos.length) {
      const getVideo = data.videos.find(video => video.type === 'Trailer')
      const key = getVideo.key
      return {
        hasLink: true,
        videoLink: `https://www.youtube.com/embed/${key}`
      }

    } else {
      return {
        hasLink: false,
        videoLink: `https://i.insider.com/5b0d4c731ae6622f008b4f81?`
      }
   
    }
  }
} 

export default cleanApiData;

