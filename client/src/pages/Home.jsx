import React from 'react'
import Header from '../component/Header'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import assets from '../assets/assets';

const Home = () => {
  const navigate = useNavigate();
  return (
    <>
      <main className="h-full bg-gradient-to-br from-indigo-100 via-white to-blue-100 py-8 px-5 transition-all duration-300 smooth-appear">
        <div className='h-[10vh]'></div>


        <div className="w-full h-[50vh] mx-auto flex flex-row md:flex-col items-center justify-between gap-10">
          <div className="flex-1 h-124 md:h-full w-[40vw] text-center md:text-left flex flex-col items-center gap-5 shadow-xl rounded-4xl hover:shadow-2xl">
            <h1 className="p-10 text-2xl md:text-5xl font-extrabold text-indigo-700 mb-1 md:mb-4">
              Welcome to <span className="text-blue-600">MyNoteShare</span>
            </h1>
            <p className="text-gray-700 text-lg mb-3 md:mb-6 px-16">
              Upload, browse, and download academic notes with ease. Connect with peers and simplify your study life.
            </p>

            <div className='flex flex-row gap-10'>
              <span onClick={()=> navigate("/getnotes")} className='bg-blue-600 hover:bg-blue-300  rounded-lg px-2 md:px-5 py-2 font-semibold text-white'>Get Notes</span>
              <span onClick={()=>navigate("/uploadnote")} className='bg-blue-600 hover:bg-blue-300 rounded-lg px-2 md:px-5 py-2 font-semibold text-white'>Upload notes</span>
            </div>
          </div>

          <div className='md:block hidden w-[50vw] h-full bg-zince-400 shadow-xl rounded-4xl hover:shadow-2xl overflow-hidden'>
            <img className='object-cover' src={assets.home} alt="" />
          </div>

        </div>


        <section className="max-w-6xl mx-auto mt-30">
          <h2 className="text-3xl font-bold text-center text-indigo-800 mb-12">
            Features Built For Students
          </h2>

          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-2xl">
              <h3 className="text-xl font-semibold text-blue-600 mb-2">Secure Upload</h3>
              <p className="text-gray-600">Upload notes in PDF, DOC, or image format securely using JWT-based auth.</p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-2xl">
              <h3 className="text-xl font-semibold text-blue-600 mb-2">Easy Search</h3>
              <p className="text-gray-600">Browse and find notes uploaded by your peers in seconds.</p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-2xl">
              <h3 className="text-xl font-semibold text-blue-600 mb-2">Download Anytime</h3>
              <p className="text-gray-600">Instantly download your notes from anywhere and anytime.</p>
            </div>
          </div>
        </section>

        {<section className="mt-24 text-center">
          <h2 className="text-3xl font-bold text-indigo-700 mb-4">
            Ready to share your notes?
          </h2>
          <p className="text-gray-600 mb-6">Start contributing and help other students grow with your notes.</p>
        </section>}
      </main>
    </>
  )
}

export default Home
