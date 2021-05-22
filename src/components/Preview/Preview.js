import React from 'react'
import './Preview.css'

export default function Preview(props) {
  return (
    <section className={props.className ? `preview ${props.className}` : `preview`} >
      <div className="trending-container">
        <img className="top-img" src="https://observer.case.edu/wp-content/uploads/2020/09/Mulan-900x506.jpg" alt="" />
        {/* <div className="info">
        </div> */}
        <h1 className="movie-title">Mulan</h1>
        <h3 className="trending">Now Trending</h3>
      </div>
    </section>
  )
}
