import React, { useState } from 'react'
import signin from './../Assets/signinbg.jpg'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import {Link} from 'react-router-dom'
import OAuth from '../components/OAuth';
import {getAuth ,createUserWithEmailAndPassword,updateProfile} from 'firebase/auth'
import {db} from '../firebase'
import {  doc, serverTimestamp, setDoc  } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import {toast} from 'react-toastify';
export default function SignUp() {
    const [showPassword,setShowPassword]=useState(false);
    const [formdata,setFormdata]=useState(
        {
            name:"",
            email:"",
            password:"",
        }
    );
    const {name,email,password} =formdata;
    const navigate=useNavigate();
   function onchange(e){
      setFormdata((prevState)=>({
        ...prevState,
        [e.target.id]:e.target.value,
        
      }))
   }
   async function onSubmit(e){
        e.preventDefault();
        try {
          const auth=getAuth()
          const userCredential=await createUserWithEmailAndPassword(
            auth,
            email,
            password);
            updateProfile(auth.currentUser,{
              displayName: name,
            })
          const user=userCredential.user;
          const formdataCopy={...formdata}
          delete formdataCopy.password
          formdataCopy.timestamp=serverTimestamp();
          await setDoc(doc(db,"users",user.uid),
        formdataCopy)
        navigate("/")
        toast.success("Signed up Successfully")
        } catch (error) {
          toast.error("Something went wrong with registration")
        }
   }
  return (
    <section >
        <h1 className='text-3xl text-center mt-8 font-bold'>Sign Up</h1>
        <div className='flex justify-center flex-wrap items-center
        px-6 py-12 max-w-6xl mx-auto '>
            <div className='md:w-[65%] lg:w-[50%] mb-12 md:mb-6'>
                <img className='w-full rounded-2xl' src={signin} alt="" />
            </div>
           <div className='w-full md:w-[65%] lg:w-[40%] lg:ml-20 '>
             <form  onSubmit={onSubmit}>
             <input className='w-full px-4 py-2
               text-xl text-gray-700 bg-white
               border-gray-300 rounded transition ease-in-out mb-6' type='text' id='name' value={name}
               onChange={onchange}
               placeholder='Full Name'
               />
               <input className='w-full px-4 py-2
               text-xl text-gray-700 bg-white
               border-gray-300 rounded transition ease-in-out mb-6' type='email' id='email' value={email}
               onChange={onchange}
               placeholder='Email Address'
               />
               <div className='relative'>
               <input className='w-full px-4 py-2
               text-xl text-gray-700 bg-white
               border-gray-300 rounded transition ease-in-out mb-6'
                type={showPassword ? 'text' : 'password'} id='password' value={password}
               onChange={onchange}
               placeholder='Password'
               />
               {showPassword ? <FaEyeSlash className='absolute  right-3 top-3 text-xl cursor-pointer'
               onClick={()=>setShowPassword((prevState)=>!prevState)}/> : <FaEye className='absolute right-3 top-3 text-xl cursor-pointer'
               onClick={()=>setShowPassword((prevState)=>!prevState)}/>}
               </div>
               <div>
                <div className='flex justify-between whitespace-nowrap
                 text-sm  sm:text-lg'>
                  <p className='mb-6'>Have an account?
                    <Link to='/sign-in'
                    className='text-red-600 hover:text-red-700
                    transition duration-200 ease-in-out
                    ml-4'>Sign in</Link>
                  </p>
                  <p>
                    <Link to='/forgot-password'
                     className='text-blue-600 hover:text-blue-800
                     transition duration-200 ease-in-out
                     '>Forgot password?</Link>
                  </p>
                </div>
               </div>
               <button className='w-full
               bg-blue-600 text-white px-7
               py-3 font-medium uppercase rounded shadow-md
               hover:text-white-700 transition duration-150
                ease-in-out hover:shadow-md active:bg-blue-800'
               type='submit'>Sign up</button>
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
