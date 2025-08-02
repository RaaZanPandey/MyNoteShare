import React, { useRef, useState, useContext } from 'react'
import assets from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import { toast } from 'react-toastify'
import AppContext from '../Contex/AppContext';

const ResetPassword = () => {
  const navigate = useNavigate();
  const inputRef = useRef([]);
  const [Loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isEmailSent, setEmailSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [isOtpSubmitted, setIsOtpSubmitted] = useState(false);
  const { setuserData, isLoggedIn, userData, backendURL, getUserData } = useContext(AppContext);

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

  const onSubmitEmail = async (e) => {
    axios.defaults.withCredentials = true;
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(`${backendURL}send-reset-otp?email=${email}`)
      if (response.status === 200) {
        toast.success("Password reset OTP sent successfully.");
        setEmailSent(true);
      }
      else {
        toast.error("Somting went worng, please try again. ");
      }
    } catch (error) {
      toast.error(error.message);
    }
    finally {
      setLoading(false);
    }
  }

  const handelOtpSubmit = async (e) => {
    const newotp = inputRef.current.map((input) => input.value).join("");
    setOtp(newotp);
    setIsOtpSubmitted(true);
    toast.success("OTP submitted succesfully.")
  }

  const onSubmitNewPassword = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const response = await axios.post(`${backendURL}reset-password`, { email, otp, newPassword });
      if (response.status === 200) {
        toast.success("Password reset successfully");
        navigate("/login"); ''
      } else {
        toast.error("Something went wrong, please try again.");
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className='h-[100vh] w-[100vw] flex flex-col z-0 bg-green-600 smooth-appear' >
      <div className='h-[10vh] w-full navbar bg-green-600 px-5 flex justify-center items-center'>
        <div className='flex items-center gap-2 cursor-pointer' onClick={() => navigate("/")}>
          <span className='text-white font-bold text-2xl'>MyNoteShare</span>
        </div>
      </div>

      <div className='h-90vh w-full flex justify-center mt-20'>
        {!isEmailSent && (
          <div className='flex items-center justify-center relative bg-white rounded-lg'>
            <div className='rounded-4 p-5 text-center w-[100%] h-[100%]'>
              <h3>Reset Password</h3>
              <p className='mb-4'>Enter your registered email address</p>
              <form onSubmit={onSubmitEmail}>
                <div className='input-group mb-4 bg-secondary roulded-lg'>
                  <input type='email' className='form-control text-black ps-1 pe-4 rounded-lg border-2 border-black'
                    placeholder='Enter email address'
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    required
                  />
                </div>
                <button className='btn btn-primary w-100 py-2' type='submit' disabled={Loading}>
                  {Loading ? "Loading..." : "Submit"}
                </button>
              </form>
            </div>

          </div>
        )}
        {!isOtpSubmitted && isEmailSent && (
          <div className='h-90vh w-full flex justify-center mt-20'>
            <div className='h-auto w-[20vw] border-2 border-black text-black z-10 py-10  bg-white rounded-lg flex flex-col items-center'>
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
              <button className='w-[80%] btn btn-primary py-2' type='submit' disabled={Loading} onClick={handelOtpSubmit}>
                {Loading ? "Verifying..." : "Verify email"}
              </button>
            </div>
          </div>
        )}

        {isOtpSubmitted && isEmailSent && (
          <div className='rounded-lg p-4 text-center w-auto h-full bg-white flex flex-col items-center'>
            <h1>New Password</h1>
            <p className='mb-4'>Enter new password below</p>
            <form onSubmit={onSubmitNewPassword}>
              <div className='input-group mb-4 bg-secondar bg-opacity-10 rounded-lg'>
                <input
                  type='password'
                  className='border-2 border-black ps-1 pe-4 rounded-lg'
                  placeholder='**********'
                  onChange={(e) => setNewPassword(e.target.value)}
                  value={newPassword}
                  required
                />
              </div>
              <button className='w-[80%] btn btn-primary py-2' type='submit' disabled={Loading}>
                {Loading ? "Loading..." : "Submit"}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}

export default ResetPassword
