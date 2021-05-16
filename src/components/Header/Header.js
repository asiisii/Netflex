import React from 'react'
import './Header.css'

import userIcon from './user_icon.svg'

export default function Header() {
  return (
    <header>
      <h3 className='app-logo'>Netflex</h3>
      <input 
        type='search'
        name='search'
        placeholder='Movie title'
      />
      <button className='user-menu-btn'><img src={userIcon} alt='user icon' /></button>
    </header>
  )
}
