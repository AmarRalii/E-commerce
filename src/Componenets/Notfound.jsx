import React from 'react'
import notFound from'../assets/error.svg'
import Footer from './../Footer';
export default function Notfound() {
  return (
    <div>
    <div className='d-flex justify-content-center align-items-center'>
    <img src={notFound} className='w-75 ' alt="" />
  
    </div>
      <Footer/>
    </div>
  )
}
