import React, { useEffect, useState } from 'react'
import logo from './../Assets/logo.png'
import {getAuth, onAuthStateChanged}from 'firebase/auth'
import { useLocation,useNavigate } from 'react-router'
export default function Header() {
    const [pageState,setPageState]=useState("Sign in")
    const location =useLocation();
    const navigate=useNavigate();
    const auth=getAuth();
    useEffect(()=>{
      onAuthStateChanged(auth,(user)=>{
        if(user)
        {
          setPageState('Profile')
        }
        else{
          setPageState('Sign in')
        }
      })
    })
    function pathMatchRoute(route){
        if(route==location.pathname)
        {
            return true;
        }
    }
  return (
    <div className='bg-white border-b shadow-sm  sticky top-0 z-40'>
      <header className='flex justify-between items-center px-3 max-w-6xl
       mx-auto'>
        <div >
            <img src={logo} alt="logo"
            className="h-12 cursor-pointer m-5" onClick={()=>{navigate("/")}} />
        </div>
        <div>
            <ul  className='flex space-x-12 text-lg'>
            <li
              className={`cursor-pointer py-3 text-m font-semibold text-gray-400 border-b-[3px] border-b-transparent ${
                pathMatchRoute("/") && "text-black border-b-red-500"
              }`}
              onClick={() => navigate("/")} 
            >
              Home
            </li>
            <li
              className={`cursor-pointer py-3 text-m font-semibold text-gray-400 border-b-[3px] border-b-transparent ${
                pathMatchRoute("/offers") && "text-black border-b-red-500"
              }`}
              onClick={() => navigate("/offers")}
            >
              Offers
            </li>
            <li
              className={`cursor-pointer py-3 text-m font-semibold text-gray-400 border-b-[3px] border-b-transparent ${
                (pathMatchRoute("/sign-in") || pathMatchRoute("/profile")) &&
                "text-black border-b-red-500"
              }`}
              onClick={() => navigate("/profile")}
            >
              {pageState}
            </li>
            </ul>
        </div>
      </header>
    </div>
  )
}
