import React from 'react'
import Header from '../Header/Header'
import Preview from '../Preview/Preview'
import './App.css';

class App extends React.Component {
  constructor() {
    super();

  }

  render() {
    return (
      <div className="App">
        <Header />
        <Preview className="preview"/>
      </div>
    )
  }
}

export default App;
