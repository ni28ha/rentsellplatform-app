import React, { useState } from 'react'
import signin from './../Assets/signinbg.jpg'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import {Link} from 'react-router-dom'
import { toast } from 'react-toastify';
import OAuth from '../components/OAuth';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
export default function ForgotPassword() {
    const [showPassword,setShowPassword]=useState(false);
    const [email,setEmail]=useState("");
  
   
   function onchange(e){
       setEmail(e.target.value)
   }
   async function onSubmit(e){
    e.preventDefault();
    try {
      const auth =getAuth();
      await sendPasswordResetEmail(auth,email);
      toast.success("Email was sent")
      
    } catch (error) {
      toast.error("Could not send reset password")
    }

   }
  return (
    <section >
        <h1 className='text-3xl text-center mt-8 font-bold'>Forgot Password</h1>
        <div className='flex justify-center flex-wrap items-center
        px-6 py-12 max-w-6xl mx-auto '>
            <div className='md:w-[65%] lg:w-[50%] mb-12 md:mb-6'>
                <img className='w-full rounded-2xl' src={signin} alt="" />
            </div>
           <div className='w-full md:w-[65%] lg:w-[40%] lg:ml-20 '>
             <form onSubmit={onSubmit}>
               <input className='w-full px-4 py-2
               text-xl text-gray-700 bg-white
               border-gray-300 rounded transition ease-in-out mb-6' type='email' id='email' value={email}
               onChange={onchange}
               placeholder='Email Address'
               />
               
               <div>
                <div className='flex justify-between whitespace-nowrap
                 text-sm  sm:text-lg'>
                  <p className='mb-6'>Don't have an account?
                    <Link to='/sign-up'
                    className='text-red-600 hover:text-red-700
                    transition duration-200 ease-in-out
                    ml-4'>Register</Link>
                  </p>
                  <p>
                    <Link to='/sign-in'
                     className='text-blue-600 hover:text-blue-800
                     transition duration-200 ease-in-out
                     '>Sign in</Link>
                  </p>
                </div>
               </div>
               <button className='w-full
               bg-blue-600 text-white px-7
               py-3 font-medium uppercase rounded shadow-md
               hover:text-white-700 transition duration-150
                ease-in-out hover:shadow-md active:bg-blue-800'
               type='submit'>Send reset password</button>
               <div className='flex  items-center my-4 before:border-t  before:flex-1
               after:border-gray-300
               after:border-t  after:flex-1
               before:border-gray-300'>
                <p className='text-center font-semibold mx-4'>OR</p>
               </div>
               <OAuth/>
             </form>
           </div>
        </div>
    </section>
  )
}
