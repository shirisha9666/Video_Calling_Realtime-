
import React from 'react'
import toast from 'react-hot-toast'



const Homepage = () => {


  return (
    <div>
      <button onClick={()=>toast.error("hello world")}>click</button>
    </div>
  )
}

export default Homepage