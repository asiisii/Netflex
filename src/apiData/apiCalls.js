import React from 'react'

const baseURL = 'https://rancid-tomatillos.herokuapp.com/api/v2/'
const apiCalls = {
  fetchApiData: async (query) => {
    return await fetch(`${baseURL}${query}`)
  },

  checkForError: status => {
    let errorMsg;

    switch (status) {
      case 404:
        errorMsg = 'Sorry! We can\'t find the page you\'re looking for...';
        break;
      case 500:
        errorMsg = 'Internal Server Error. Our whole team are now aware.';
        break;
      default:
        errorMsg = 'Oops! Request failed. Please try again.';
    }

    return <h1>{errorMsg}</h1>
  
  }

}

export default apiCalls