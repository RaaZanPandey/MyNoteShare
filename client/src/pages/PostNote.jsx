import React from 'react';
import { useState, useContext } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import AppContext from '../Contex/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const PostNote = () => {
    const [notes, setNotes] = useState({ title: "", description: "", file: "" });

    const { userData, backendURL } = useContext(AppContext);
    const navigate = useNavigate();

    const handelSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("title", notes.title);
        formData.append("description", notes.description);
        formData.append("file", notes.file);
        formData.append("createdBy", userData.userId);

        try {

            const response = await axios.post(`${backendURL}notes/postNote`, formData, {
                withCredentials: true
            });

            if (response.status === 200) {
                toast.success("Notes uploaded successfully");
            }
            else if (response.status === 401) {
                toast.error("User is not authenticated ");
            }
            else {
                toast.error("Unable to post the notes ");
            }
        } catch (error) {
            toast.error(error);
        }
        setNotes({ title: "", description: "", file: "" });
    }

    const handelChange = (e) => {
        setNotes((prevNote) => ({
            ...prevNote,
            [e.target.name]: e.target.value,
        }))
    }
    return (
       <div className="min-h-screen bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 flex items-center justify-center px-4 py-10 smooth-appear">
  <div className="bg-white shadow-xl rounded-2xl w-full max-w-lg p-10 transition-all duration-300 ease-in-out">
    <h2 className="text-3xl font-extrabold mb-8 text-gray-800 text-center tracking-wide">📚 Upload a Note</h2>

    <form onSubmit={handelSubmit} className="space-y-6">
      {/* Title Input */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">Note Title</label>
        <input
          type="text"
          placeholder="Enter note title"
          name="title"
          value={notes.title}
          onChange={handelChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
        />
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
        <textarea
          placeholder="Write a short description..."
          rows={4}
          name="description"
          value={notes.description}
          onChange={handelChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
        ></textarea>
      </div>

      {/* File Upload */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">Upload File</label>
        <input
          type="file"
          onChange={(e) => setNotes({ ...notes, file: e.target.files[0] })}
          className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-white file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-100 file:text-indigo-700 hover:file:bg-indigo-200 transition"
        />
      </div>

      {/* Submit or Login */}
      <div>
        {userData ? (
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-indigo-700 hover:shadow-lg transition"
          >
            🚀 Submit Note
          </button>
        ) : (
          <button
            onClick={() => navigate("/login")}
            type="button"
            className="w-full bg-red-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-red-600 hover:shadow-lg transition"
          >
            🔐 Login to Upload Notes
          </button>
        )}
      </div>
    </form>
  </div>
</div>

    );
};

export default PostNote;
