import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react"

export  function useAuthStatus() {
    const [loggedIn,setLoggedIn]=useState(false);
    // for loading effect that will be added for fetching the data from firebase..

    const [checkingStatus,setCheckingStatus]=useState(true)

    // using useEffect to ask firebase if the user is authenticated
    useEffect(()=>{
        const auth=getAuth();
        onAuthStateChanged(auth,(user)=>{
            if(user)
            {
                setLoggedIn(true);
            }
            setCheckingStatus(false)
        })
    },[]);

  return  {loggedIn,checkingStatus}
}
