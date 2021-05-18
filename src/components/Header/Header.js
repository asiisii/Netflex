import React from 'react'
import './Header.css'

import userIcon from './images/user_icon.svg'
import searchIcon from './images/search_icon.svg'
import backIcon from './images/back_icon.svg'

export default class Header extends React.Component {
  constructor() {
    super()
    this.state = {
      mobileSearchOpen: false,
      width: null
    }
  }

  handleClick = () => {
    this.setState({
      mobileSearchOpen: !this.state.mobileSearchOpen
    })
  }

  handleResize = () => {
    this.setState({
      width: window.innerWidth
    })

    // console.log(this.state.width);

    if (this.state.width > 576 && this.state.mobileSearchOpen) {
      console.log('here')
      this.setState({
        mobileSearchOpen: false
      })
    }
  }

  componentDidMount = () => {
    window.addEventListener('resize', this.handleResize);
  }

  render() {
    console.log(this.state.mobileSearchOpen)
    return (
      <header>
        {!this.state.mobileSearchOpen && <h3 className='app-logo'>Netflex</h3>}
        <div className='header-actions'>
          <input 
            className='movie-search-field'
            type='search'
            name='search'
            placeholder='What movie were you looking for?'
          />
          <button 
            className='mobile-search-btn'
            onClick={this.handleClick}>
              <img src={searchIcon} alt='search icon' />
          </button>
          {!this.state.mobileSearchOpen ? 
            <button className='user-menu-btn'>
              <img src={userIcon} alt='user icon' />
            </button> :
            <button>
              <img src={backIcon} alt='back icon'/>
            </button>
          }
        </div>
      </header>
    )
  }
}
