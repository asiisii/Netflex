import React from 'react'
import './Preview.css'

export default function Preview({className}) {
  return (
    <section className={className ? `preview ${className}` : `preview`} >
      <div className="trending-container">
        <img className="top-img" src="https://observer.case.edu/wp-content/uploads/2020/09/Mulan-900x506.jpg" alt="" />
        {/* <div className="info">
        </div> */}
        <h1 className="movie-title">Mulan</h1>
        <h2 className="trending">Now Trending</h2>
      </div>
    </section>
  )
}
