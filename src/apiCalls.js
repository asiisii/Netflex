const baseURL = 'https://rancid-tomatillos.herokuapp.com/api/v2/movies'
const apiCalls = {
  fetchAllMovies: async () => {
    const response = await fetch(`${baseURL}`)
    return await response.json()
  },

  fetchAMovie: async id => {
    const response = await fetch(`${baseURL}/${id}`)
    return await response.json()
  },

  fetchVideos: async id => {
    const response = await fetch(`${baseURL}/${id}/videos`)
    return await response.json()
  }

}


export default apiCalls