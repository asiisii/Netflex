import React from 'react'
import './Header.css'

import userIcon from './user_icon.svg'

export default function Header() {
  return (
    <header>
      <h3 className='app-logo'>Netflex</h3>
      <input
        className='movie-search-field' 
        type='search'
        name='search'
        placeholder='Title search'
      />
      <button className='user-menu-btn'><img src={userIcon} alt='user icon' /></button>
    </header>
  )
}
