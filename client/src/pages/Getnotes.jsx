import axios from 'axios'
import React, { useEffect, useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AppContext from '../Contex/AppContext'
import { toast } from 'react-toastify'
import assets from '../assets/assets'

const Getnotes = () => {
    const navigate = useNavigate();
    const [notes, setNotes] = useState([]);
    const { backendURL, userData } = useContext(AppContext);
    const [loading, setLoading] = useState(false);

    const getNotes = async () => {

        try {
            setLoading(true)
            const response = await axios.get(`${backendURL}notes/getallNote`, { withCredentials: true });
            if (response.status === 200) {
                setNotes(response.data);
            } else {
                toast.error("Something went wrong");
            }
        } catch (error) {
            // toast.error("Unable to fetch notes");
            setLoading(false);
        }
        finally{
            setLoading(false);
        }
    }

    useEffect(() => { getNotes() }, []);

    return (
        <div className=" min-h-screen pt-10 bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 smooth-appear">
            <div className='h-[10vh]'></div>
            {userData ? (
                <div>
                    <span className='text-center'> <h4> Hii, {userData.name}</h4></span>
                    
                    {loading && 
                     <div className="flex flex-wrap justify-center gap-8 p-6">
                        <h2 className='blink-dots'>Fetching notes...</h2>
                    </div>
                    }
                    {notes.length < 1 ? 
                     <div className="flex flex-wrap justify-center gap-8 p-6">
                      <h2>Notes are not avilable.</h2>
                    </div>   
                    :
                    <div className="flex flex-wrap justify-center gap-8 p-6">
                        {notes.map((notes, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-2xl shadow-md p-4 w-[18rem] hover:shadow-2xl transition duration-300">
                                <div className="flex justify-center mb-3">
                                    {notes.fileType === "pdf" && (
                                        <img
                                            src={assets.pdf}
                                            alt="pdf"
                                            className="w-20 h-20 object-contain"
                                        />
                                    )}
                                    {notes.fileType === "vnd.openxmlformats-officedocument.wordprocessingml.document" && (
                                        <img
                                            src={assets.docx}
                                            alt="docx"
                                            className="w-20 h-20 object-contain"
                                        />
                                    )}
                                         {notes.fileType === "jpeg" && (
                                        <img
                                            src={assets.jpeg}
                                            alt="docx"
                                            className="w-20 h-20 object-contain"
                                        />
                                    )}
                                </div>
                                <div className="space-y-1">
                                    <h5 className="text-lg font-semibold text-gray-800">
                                        {notes.title}
                                    </h5>
                                    <p className="text-sm text-gray-600">
                                        {notes.description}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        Uploded by: <span className="font-medium">{notes.createdBy}</span>
                                    </p>
                                </div>

                                <div className="flex justify-between mt-4 gap-2">
                                    <a
                                        href={`${backendURL}notes/readNote/${notes.id}`}
                                        className="border-2 border-green-600 px-3 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 transition w-1/2 text-center">
                                        Preview
                                    </a>
                                    <a
                                        href={`${backendURL}notes/download/${notes.id}`}
                                        className="border-2 text-green-600 px-3 py-2 rounded-md text-sm font-medium hover:bg-green-700 transition w-1/2 text-center">
                                        Download
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>     
                }
                   
                </div>
            ) : (
                <div className='w-full h-full flex flex-col gap-10 justify-center items-center'>
                    <h3>Please login your account to access Notes!</h3>
                    <div className='flex flex-row justify-center items-center gap-5'>
                        <button className='w-auto h-auto px-5 py-2 font-bold text-white bg-blue-700 rounded-lg ' onClick={() => navigate("/login")}>Login</button>
                    </div>

                </div>

            )}

        </div>
    );
}

export default Getnotes;
