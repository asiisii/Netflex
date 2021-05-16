import apiCalls from './apiCalls'

const cleanApiData = {
  getAllMoives: (data) => {
      // console.log(data.movies);
    return data.movies.map(movie => {
      return {
        id: movie.id,
        poster: movie.poster_path
      }
    })
    // console.log(d);
  }
} 



export default cleanApiData;

