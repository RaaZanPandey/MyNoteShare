import React, { useState, useEffect } from 'react'
import { createContext } from 'react'
import { AppConstants } from '../util/constant';
import axios from 'axios';
import { toast } from 'react-toastify';
export const AppContext = createContext();

export const AppContextProvider = (props) =>{

  axios.defaults.withCredentials = true;

    const backendURL = AppConstants.BACKEND_URL;
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    

     //INITIALLY WE HAVE TO CHECK WHEATHER THE USER DATA IS PRESNT IN LOCALSTORAGE OR NOT IF USERDATA IS PRESNT IN LOCAL STORAGE USER JUST HAVE REFRESH THE PAGE SO WE HAVE TO SET THE SAME DATA TO USERSTATE WHICH IS PRESNT IN LOCAL
    const [userData, setuserData] = useState(()=>{  
        const storeData = localStorage.getItem("userData")
      return storeData ? JSON.parse(storeData) : null;
    });
         
    
    const getUserData = async () => {          //GET USER DATA 
      try {
        const response = await axios.get(`${backendURL}profile`);
        if(response.status === 200){
            setuserData(response.data);
        }
        else{
            toast.error("Unable to fetch user data");
        }
      } catch (error) {
        toast.error(error.message);
      }
    }

    const getAuthState = async () =>{    //GET THE AUTH STATE
      try {
        const response = await axios.get(`${backendURL}is-authenticated`);
        if(response.status === 200  && response.data === true){
          setIsLoggedIn(true);
          await getUserData();
        } else{
          setIsLoggedIn(false);
        }
      } catch (error) {
        setIsLoggedIn(false);
      }
    }

    useEffect(()=>{                //CHECK WHEATHER THE USER IS AUTHENTICATED OR NOT IN EACH TIME WHEN THE PAGE IS LOAD
      getAuthState();
    }, []);

    useEffect(()=>{          //SAVE USER WHENEVER THE USER IS BEING CHANGE
      if(userData){
        localStorage.setItem("userData", JSON.stringify(userData))
      }
      else{
        localStorage.removeItem(userData)
      }
    },[userData])

    const contextValue = {
      backendURL,
      isLoggedIn, setIsLoggedIn,
      userData, setuserData,
      getUserData,
    }
    return (
        <AppContext.Provider value={contextValue}>
          {props.children}
        </AppContext.Provider>
    )
}

export default AppContext;
