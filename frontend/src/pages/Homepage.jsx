import { useQuery } from '@tanstack/react-query'
import React from 'react'
import toast from 'react-hot-toast'
import axios from "axios"
import { axiosInstance } from '../lib/axios'

const Homepage = () => {
  const {data,isLoading,error}=useQuery({
    queryKey:["todos"],
    queryFn:async()=>{
      const res=await axiosInstance.get("/auth/me")
  return res.data
  
    }
  })
  console.log("result",data)
  return (
    <div>
      <button onClick={()=>toast.error("hello world")}>click</button>
    </div>
  )
}

export default Homepage