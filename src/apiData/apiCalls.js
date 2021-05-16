const baseURL = 'https://rancid-tomatillos.herokuapp.com/api/v2/'
const apiCalls = {
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