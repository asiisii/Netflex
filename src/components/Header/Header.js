import React from 'react'
import './Header.css'

import userIcon from './user_icon.svg'

export default function Header({ handleChange }) {
  return (
    <header>
      <h3 className='app-logo'>Netflex</h3>
      <div className='header-actions'>
        <input 
          className='movie-search-field'
          type='search'
          name='search'
          placeholder='What movie were you looking for?'
          onChange={e => handleChange(e)}
        />
        <button className='user-menu-btn'><img src={userIcon} alt='user icon' /></button>
      </div>
    </header>
  )
}
