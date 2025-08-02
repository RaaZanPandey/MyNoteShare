import axios from 'axios';
import React from 'react';
import { useState, useContext } from 'react';
import AppContext from '../Contex/AppContext';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


const Feedback = () => {
  const [feedback, setfeedback] = useState({ subject: "", type: "", description: "" });
  const { backendURL, userData } = useContext(AppContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setfeedback((prev) =>
    ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${backendURL}feedback`,
        {
          "userId": userData.userId,
          "subject": feedback.subject,
          "type": feedback.type,
          "description": feedback.description
        },
        { withCredentials: true }
      )

      if (response.status == 200) {
        toast.success("Feedback submitted succesfully ");
      } else {
        toast.error("Unable to submit feedback");
      }
    } catch (error) {
      toast.error(error);
    } finally {
      setfeedback({ subject: "", type: "", description: "" });
    }
  }
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 flex items-center justify-center px-4 py-10 smooth-appear">
      <div className="max-w-xl w-full bg-white rounded-2xl shadow-xl p-8 transition-all duration-300 ease-in-out">
        <h2 className="text-3xl font-extrabold text-center text-indigo-700 mb-6 tracking-wide">
          📝 Feedback Form
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Subject */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Subject</label>
            <input
              name="subject"
              value={feedback.subject}
              onChange={handleChange}
              type="text"
              placeholder="Enter subject"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            />
          </div>

          {/* Feedback Type */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Feedback Type</label>
            <select
              name="type"
              value={feedback.type}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            >
              <option value="">Select type</option>
              <option value="bug">🐛 Bug Report</option>
              <option value="suggestion">💡 Suggestion</option>
              <option value="feature">🚀 Feature Request</option>
              <option value="other">✉️ Other</option>
            </select>
          </div>

          {/* Message */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Message</label>
            <textarea
              name="description"
              value={feedback.description}
              onChange={handleChange}
              rows="5"
              placeholder="Write your feedback here..."
              className="w-full px-4 py-2 rounded-lg border border-gray-300 shadow-sm resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            ></textarea>
          </div>

          {/* Submit */}
          {userData ?
            <div className="text-center">
              <button
                type="submit"
                className="inline-block bg-indigo-600 text-white font-semibold px-8 py-2 rounded-lg hover:bg-indigo-700 hover:shadow-lg transition duration-200"
              >
                🚀 Submit
              </button>
            </div>
            :
            <div className="text-center">
              <button  
              onClick={() => navigate('/login')}
                type="button"
                className="inline-block bg-indigo-600 text-white font-semibold px-8 py-2 rounded-lg hover:bg-indigo-700 hover:shadow-lg transition duration-200"
              >
                🔐 Login to give feedback
              </button>
            </div>
          }

        </form>
      </div>
    </div>

  );
};

export default Feedback;
