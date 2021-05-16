const baseURL = 'https://rancid-tomatillos.herokuapp.com/api/v2/'
const apiCalls = {
  fetchAllMovies: async () => {
    const response = await fetch(`${baseURL}`)
    return await apiCalls.checkForError(response)
  },

  fetchAMovie: async id => {
    const response = await fetch(`${baseURL}/${id}`)
     return await apiCalls.checkForError(response)
  },

  fetchVideos: async id => {
    const response = await fetch(`${baseURL}/${id}/videos`)
     return await apiCalls.checkForError(response)
  },
  fetchApiData: async (query) => {
    const response = await fetch(`${baseURL}${query}`)
    return await apiCalls.checkForError(response)
  },

  checkForError: response => {
    if (!response.ok) {
      throw new Error('Network response was not ok')
    } 
    return response.json()
  }

}


export default apiCalls