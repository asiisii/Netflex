import React from 'react'
import './Header.css'

import userIcon from './images/user_icon.svg'
import searchIcon from './images/search_icon.svg'
import backIcon from './images/back_icon.svg'

export default class Header extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      mobileSearchOpen: false,
      width: window.innerWidth
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

    if (this.state.width > 576 && this.state.mobileSearchOpen) {
      this.setState({
        mobileSearchOpen: false
      })
    }
  }

  componentDidMount = () => {
    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount = () => {
    window.removeEventListener('resize', this.handleResize);
  }

  render() {
    return (
      <header>
        {!this.state.mobileSearchOpen && <h3 className='app-logo'>Netflex</h3>}
        <div className='header-actions'>
          {this.state.mobileSearchOpen && 
            <button onClick={this.handleClick} className='close-search-btn'>
              <img src={backIcon} alt='back icon'/>
            </button>
          }
          {(this.state.mobileSearchOpen || this.state.width >= 576) &&
            <input 
              className='movie-search-field'
              type='search'
              name='search'
              placeholder={this.state.width >= 576 ? 'What movie were you looking for?' : 'Movie search'}
              autoComplete='off'
              onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
              onChange={e => this.props.handleChange(e)}
            />
          }
          {!this.state.mobileSearchOpen &&
            <>
              <button 
              className='mobile-search-btn'
              onClick={this.handleClick}>
                <img src={searchIcon} alt='search icon' />
              </button> 
              <button className='user-menu-btn'>
                <img src={userIcon} alt='user icon' />
              </button>  
            </>
          }
        </div>
      </header>
    )
  }
}
