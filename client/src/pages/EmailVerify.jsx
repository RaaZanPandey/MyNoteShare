import React, { useRef, useState, useContext, useEffect } from 'react'
import assets from '../assets/assets'
import { useNavigate, } from 'react-router-dom';
import AppContext from '../Contex/AppContext';
import { toast } from 'react-toastify';
import axios from 'axios';

const EmailVerify = () => {

  const inputRef = useRef([]);
  const [Loading, setLoading] = useState(false);
  const { setuserData, isLoggedIn, userData, backendURL, getUserData } = useContext(AppContext);
  const navigate = useNavigate();

const handleChange = (e, index) => {
  const value = e.target.value;

  // Only allow digits
  if (!/^\d*$/.test(value)) return;

  if (value && inputRef.current[index + 1]) {
    inputRef.current[index + 1].focus();
  }
};


const handleKeyDown = (e, index) => {
  if (e.key === "Backspace") {
    if (e.target.value === "" && inputRef.current[index - 1]) {
      inputRef.current[index - 1].focus();
    }
  }
};

const handlePaste = (e) => {
  e.preventDefault();
  const paste = e.clipboardData.getData("text").slice(0, 6).replace(/\D/g, "").split("");

  paste.forEach((digit, i) => {
    if (inputRef.current[i]) {
      inputRef.current[i].value = digit;
    }
  });

  const next = Math.min(paste.length, inputRef.current.length - 1);
  inputRef.current[next]?.focus();
};

const handleVerify = async (e) =>{
  e.preventDefault();
  const otp = inputRef.current.map(input => input.value).join("");
  if(otp.length !== 6){
    toast.error("Please enter all 6 digits of the OTP");
    return;
  }
  setLoading(true);

  try {
    const response = await axios.post(`${backendURL}verify-otp`, { otp });
    if(response.status === 200){
      toast.success("OTP varify succesfully!");
      getUserData();
      navigate("/");
    }
    if(response.status === 401){
      toast.error("User is not authenticate")
    }
    else{
      toast.error("Invalid OTP");
    }
  } catch (error) {
    toast.error("Failed to verify OTP. Please try again.");
  }
  finally{
    setLoading(false);
  }
}

useEffect(()=>{
  isLoggedIn && userData && userData.isAccountVerified && navigate("/");
}, [isLoggedIn, userData]);

  return (
    <div className='h-[100vh] w-[100vw] flex flex-col z-0' >
      <div className='h-[10vh] w-full navbar bg-white px-5 d-flex justify-center items-center p-10'>
        <div className='flex items-center gap-2'>
          <span className='text-indigo-400 font-bold text-2xl w-10' onClick={()=> navigate("/")}>MyNoteShare</span>
        </div>
      </div>
      <div className='h-90vh w-full flex justify-center mt-20'>
        <div className='h-auto w-[20vw] border-2 border-black  text-black z-10 py-10'>
          <h4 className='text-center font-bold mt-10 mb-3'>Email Verify OTP</h4>
          <p className='text-center mb-5'>Enter the 6-digit code sent to your email.</p>

          <div className='mx-[10%] w-[80%] flex  gap-2 text-center text-white mb-5 text-bold'>
            {[...Array(6)].map((_, i) => (
              <input
                  ref={(el) => inputRef.current[i] = el}
                onChange={(e) => handleChange(e, i)}
                onKeyDown={(e) => handleKeyDown(e, i)}
                onPaste={handlePaste}
                key={i}
                type='text'
                maxLength={1}
                className='form-control text-center text-2xl w-12 h-14 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500' />
            ))}
          </div>
          <button className='btn btn-primary w-100 font-semibold' disabled={Loading} onClick={handleVerify}>
            {Loading ? "Varifying..." : "Verify email"}
          </button>
        </div>
      </div>
    </div>
  )
}

export default EmailVerify
