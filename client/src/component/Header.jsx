import React, { useContext } from 'react'
import assets from '../assets/assets'
import AppContext from '../Contex/AppContext'

const Header = () => {
  const { userData } = useContext(AppContext)

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4 py-10 bg-gradient-to-br from-white via-yellow-100 to-white">
      <img
        className="w-44 h-44 object-contain mb-4"
        src={assets.header}
        alt="header"
      />

      <h5 className="text-xl font-semibold text-gray-800">
        Hey {userData ? userData.name : "Developer"} <span role="img" aria-label="wave">👋</span>
      </h5>

      <h1 className="text-4xl md:text-5xl font-extrabold text-blue-700 my-4">
        Welcome to MyNoteShare
      </h1>

      <p className="text-gray-600 max-w-xl text-lg mb-6">
        Let's start with a quick product tour. Set up authentication and share your notes effortlessly!
      </p>

      <button className="bg-black text-white px-6 py-2 rounded-full font-semibold hover:bg-gray-900 transition">
        Get Started
      </button>
    </div>
  )
}

export default Header
