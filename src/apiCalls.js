const urls = {
  allMoviesData: 'https://rancid-tomatillos.herokuapp.com/api/v2/movies',
  movieData: 'https://rancid-tomatillos.herokuapp.com/api/v2/movies/337401',
  videoData: 'https://rancid-tomatillos.herokuapp.com/api/v2/movies/337401/videos',
}

const apiCalls = {

  fetchAllMovies: async () => {
    const response = await fetch(`${urls.allMoviesData}`);
    return await response.json();
  },

  fetchAMovie: async id => {
    const response = await fetch(`${urls.allMoviesData}/${id}`);
    return await response.json();
  }

}


export default apiCalls;