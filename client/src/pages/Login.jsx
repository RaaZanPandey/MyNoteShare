import React from 'react'
import assets from '../assets/assets'
import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import AppContext from '../Contex/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {
  const navigate = useNavigate();
  const [isCreateAccount, setIsCreateAccount] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { backendURL, setIsLoggedIn, getUserData } = useContext(AppContext);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    axios.defaults.withCredentials = true;
    setLoading(true);
    try {
      if (isCreateAccount) {
        const response = await axios.post(`${backendURL}register`, { name, email, password });
        if (response.status === 201) {
          navigate("/");
          toast.success("Account created succesfully.");
        } else {
          toast.error("Email already exist");
        }

      }
      else {
        //Login API
        const response = await axios.post(`${backendURL}login`, { email, password });
        if (response.status === 200) {
          setIsLoggedIn(true);
          getUserData();
          navigate("/");
          toast.success("You have login succesfully");
        }
        else {
          toast.error("Email or Password Incorrect");
        }
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }

  }

  return (
<div
  className="w-full h-full bg-no-repeat bg-center bg-cover"
  style={{ backgroundImage: `url(${assets.background})` }}
>

  {/* Navbar */}
  <div className="h-[10vh] w-full px-6 flex justify-center items-center shadow-md bg-white/10 backdrop-blur-sm border-b border-white/20">
    <div
      className="flex items-center gap-2 cursor-pointer"
      onClick={() => navigate("/")}
    >
      <span className="text-white font-extrabold text-3xl tracking-wide">
        MyNoteShare
      </span>
    </div>
  </div>

  {/* Main Content */}
  <div className="h-[90vh] w-full px-5 flex flex-col justify-center items-center brightness-100 rounded-4xl">
    <div className="w-full max-w-md bg-white rounded-xl shadow-2xl p-6 space-y-6">
      <h2 className="text-2xl font-semibold text-center text-indigo-700">
        {isCreateAccount ? "Create Account" : "Login"}
      </h2>

      <form
        className="flex flex-col space-y-4"
        onSubmit={onSubmitHandler}
      >
        {isCreateAccount && (
          <>
            <label className="text-sm font-medium text-gray-700">Full Name</label>
            <input
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              type="text"
              placeholder="Enter Full Name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </>
        )}

        <label className="text-sm font-medium text-gray-700">Email</label>
        <input
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          type="email"
          placeholder="Enter email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label className="text-sm font-medium text-gray-700">Password</label>
        <input
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          type="password"
          placeholder="********"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <span
          className="text-sm text-blue-600 hover:underline cursor-pointer text-right"
          onClick={() => navigate("/reset-password")}
        >
          Forgot password?
        </span>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-md transition"
        >
          {loading ? "Loading..." : isCreateAccount ? "Sign up" : "Login"}
        </button>
      </form>

      {/* Toggle Login/Signup */}
      <div className="text-sm text-center">
        {isCreateAccount ? (
          <>
            <span>Already have an account? </span>
            <span
              onClick={() => setIsCreateAccount(false)}
              className="text-blue-600 hover:underline cursor-pointer"
            >
              Login here
            </span>
          </>
        ) : (
          <>
            <span>Don't have an account? </span>
            <span
              onClick={() => setIsCreateAccount(true)}
              className="text-blue-600 hover:underline cursor-pointer"
            >
              Sign up
            </span>
          </>
        )}
      </div>
    </div>
  </div>
</div>

  )
}

export default Login;
