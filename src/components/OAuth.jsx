import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import React from 'react'
import { FcGoogle } from "react-icons/fc";
import {toast} from 'react-toastify'
import {db} from './../firebase'
import {useNavigate} from 'react-router-dom'
export default function OAuth() {
  const navigate=useNavigate(); // intialize  hook
  async function onGoogleClick(){
    try {
      const auth=getAuth()
      const provider=new GoogleAuthProvider()
      // firstly signed up the person with popup
      const result =await signInWithPopup(auth,provider)
      // we got user as promise returned from result
      const user =result.user

      // adding user to database
      // check if user already exist
      const docRef=doc(db,"users",user.uid); // ref to user 
      const docSnap=await getDoc(docRef)  // checking if it exist
      if(!docSnap.exists)
      {
        // if user not exist we will add to database
        await setDoc(docRef,{
          name:user.displayName,
          email:user.email,
          timestamp:serverTimestamp(),
        });
      }
      // after adding user we are navigating back to home page..
      navigate('/');
      
    } catch (error) {
      toast.error("Could not authorize with Google")

    }

  }
  return (
    <button type='button' 
    onClick={onGoogleClick} 
    className='flex items-center justify-center
    w-full bg-red-700 text-white px-7 py-3 
    uppercase text-sm font-medium hover:bg-red-800
    active:bg-red-900 shadow-md'>
      < FcGoogle
    className='text-2xl bg-white
    rounded-full mr-2'/>Continue with Google</button>
  )
}
