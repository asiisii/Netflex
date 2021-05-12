import React from 'react'
import './header.css'

export default function Header() {
  return (
    <header>
      <h3>Netflex</h3>
      <input 
        type='search'
        name='search'
        placeholder='Movie title'
      />
      <button>👤</button>
    </header>
  )
}