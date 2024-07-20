import React from 'react'
import img from '../../assets/error.svg'
import './NotFound.scss'
export default function NotFound() {
  return (
    <div className='not-found'>
      <img src={img} alt="" />
    </div>
  )
}
