import React, { useContext, useRef, useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import assets from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import AppContext from '../Contex/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
const Menubar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { userData, backendURL, setIsLoggedIn, setuserData } = useContext(AppContext);
  const [dropDown, setDropDown] = useState(false);
  const [open, setOpen] = useState(true);
  const dropdownRef = useRef();
  const hamburger = useRef();
  const nav = useRef();



  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropDown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {

      if (window.innerWidth < 768) {
        if (nav.current && !nav.current.contains(event.target)) {
          setOpen(false);
        }
      }

    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);


  const handelLogout = async () => {
    try {
      axios.defaults.withCredentials = true;
      const response = await axios.post(`${backendURL}logout`);
      if (response.status === 200) {
        setIsLoggedIn(false);
        setuserData(false);
        navigate("/");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }

  const sentVerificationOtp = async () => {
    try {
      axios.defaults.withCredentials = true;
      const response = await axios.post(`${backendURL}send-otp`);
      if (response.status === 200) {
        navigate("/email-verify");
        toast.success("OTP has been sent succesfully");
      }
      else {
        toast.error("Unable to send OTP!");
      }
    } catch (error) {
      toast.error(error.response.message);
    }
  }


  useEffect(() => {
    if (nav.current) {
      if (window.innerWidth > 768) {
        nav.current.classList.remove('nav-closed');
        nav.current.classList.add('nav-open');
      }
      if (open) {
        nav.current.classList.remove('nav-closed');
        nav.current.classList.add('nav-open');
      } else {
        nav.current.classList.remove('nav-open');
        nav.current.classList.add('nav-closed');
      }
    }

  }, [open]);

  const hiddenPath = ["/login", "/email-verify", "/reset-password", "/profile"];
  if (hiddenPath.includes(location.pathname)) {
    return null;
  }

  return (
    <>
      <span onClick={() => setOpen(!open)} className={`z-20 ml-2 md:hidden fixed text-2xl text-black flex justify-end transition-all duration-300 ${open ? 'w-[60%]' : 'w-[5%]'}`}><i ref={hamburger} className="ri-align-justify"></i></span>

      <div ref={nav} className={`${window.innerWidth > 768 ? 'mt-0 mr-2':'mt-4 mr-0'} fixed md:w-full w-[45%] smooth-appear  transition-transform duration-300 ease-in-out z-40`}>
        <div
          className={`top-0 md:ml-0 md:left-0 h-[50vh] md:h-[10vh] w-full md:w-full bg-blue-400 px-5 flex justify-between items-center md:flex-row flex-col
             transition-transform duration-300 ease-in-out z-40
             ${open ? 'translate-x-0' : '-translate-x-full'}`}>

          <div className="flex items-center rounded-full ">

            <span className='text-xl md:text-2xl font-semibold text-white'>MyNoteShare</span>
          </div>
          <div className="flex flex-col md:flex-row gap-8 font-semibold text-xl">
            <div className={(location.pathname === "/") ? "text-white text-shadow-lg" : "text-black"} onClick={() => { navigate("/"); window.innerWidth < 768 && setOpen(!open) }}>Home <span className="sr-only">(current)</span></div>
            <div className={(location.pathname === "/getnotes") ? "text-white text-shadow-lg" : "text-black"} onClick={() => { navigate("/getnotes"); window.innerWidth < 768 && setOpen(!open) }}>View</div>
            <div className={(location.pathname === "/uploadnote") ? "text-white text-shadow-lg" : "text-black"} onClick={() => { navigate("/uploadnote"); window.innerWidth < 768 && setOpen(!open) }}>Post</div>
            <div className={(location.pathname === "/feedback") ? "text-white text-shadow-lg" : "text-black"} onClick={() => { navigate("/feedback"); window.innerWidth < 768 && setOpen(!open) }}>Feedback</div>
          </div>

          {userData ? (
            <div className="relative flex items-center justify-center mr-10" ref={dropdownRef}>

              <div
                onClick={() => setDropDown((prev) => !prev)}
                className="w-10 h-10 rounded-full bg-blue-400 text-white font-bold flex items-center justify-center cursor-pointer border-2 border-black">
                {userData.name[0]}
              </div>


              {dropDown && (
                <div className={`${window.innerWidth < 768 && 'left-5'} absolute top-12 right-0  bg-white border rounded shadow-md w-40 py-2 z-10`}>
                  <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={sentVerificationOtp}>
                    {!userData.isAccountVerified && (" Verify Email")}
                  </div>
                  <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer " onClick={() => navigate("/profile")}> View profile</div>
                  <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer " onClick={handelLogout}> Login</div>
                  <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-red-700" onClick={handelLogout}> Logout</div>
                </div>
              )}
            </div>
          ) : (
            <div className='btn btn-outline-dark rounded-pill px-3 items-center justify-center' onClick={() => navigate("/login")}>
              Login <span className=' justify-center items-center'><i className="ri-arrow-right-line"></i></span>
            </div>
          )}


        </div>
      </div>
    </>
  )
}

export default Menubar
