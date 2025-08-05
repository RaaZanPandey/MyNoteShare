
import { useContext, useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import AppContext from '../Contex/AppContext';
import axios from 'axios';
import assets from '../assets/assets';
import { toast } from 'react-toastify';

const Profile = () => {
  const { backendURL, userData, setIsLoggedIn, setuserData, getUserData } = useContext(AppContext);
  const [notes, setNotes] = useState([]);
  const [updatedData, setUpdatedData] = useState({ name: "", bio: "" });
  const [isDeletePage, setIsDeletePage] = useState(false);
  const [isUpdata, setIsUpdata] = useState(false);
  const [isDeletNote, setIsDeleteNote] = useState(false)
  const navigate = useNavigate();

  useEffect(() => {  //IF USERDATA IS NOT PRESNT IT CALL THE  GETUSERDATA FUNCTION AND SAVE IT TO USERDATA
    if(userData?.userId)
    getUserData()
    getUserNotes()
  }, [userData]);

  async function getUserNotes() {
    try {
      const response = await axios.get(`${backendURL}notes/findnotesbyuser/${userData.userId}`, { withCredentials: true });
      if (response.status == 200) {
        setNotes(response.data)
      }
    } catch (error) {
    }
    finally{
    }
  }


  const HandelDelete = async () => {
    try {
      const response = await axios.delete(`${backendURL}deleteuser/${userData.userId}`)
      if (response.status == 200) {
        setIsLoggedIn(false);
        setuserData(false);
        navigate("/");
        toast.success("Account deleted succesfully");
        navigate("/")
      }
    } catch (error) {
      toast.error("Somthing went worong try again later")
    }
    finally {
      setIsDeletePage(false)
    }
  }

  const handleChange = (e) => {
    setUpdatedData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`${backendURL}edit_profile/${userData.userId}`,
        {
          "name": updatedData.name,
          "bio": updatedData.bio
        },
        { withCredentials: true })

      if (response.status == 200) {
        toast.success("Profile updated succesfully");
        getUserData();
      } else {
        toast.error("Somthing went worng try again later");
      }
    } catch (error) {
      toast.error(error);
    }
    finally {
      setIsUpdata(false);
    }
  }

  const DeleteNote = async (id) => {
    try {
      const response = await axios.delete(`${backendURL}delete/${id}`, { withCredentials: true })
      if (response.status == 200) {
        toast.success("Note deleted succesfully");
      }
      else {
        toast.error("Unable to delete note ! Please try agian later")
      }
    } catch (error) {
      toast.error(error);
    }
  }
  return (
    <div className="h-[100vh] w-[100vw] mx-auto p-6 bg-blue-300 overflow-scroll smooth-appear">
      <button onClick={()=>navigate("/")} className='w-15 text-2xl md:text-4xl border-1 border-zinc-300  px-6 hover:bg-gray-100 rounded-lg flex justify-end text-black'><i class="ri-arrow-left-line"></i></button>
      <div className="flex flex-col items-center space-y-4 relative">


        <div className={`${isUpdata ? 'block' : 'hidden'} h-80 w-auto space-y-4 bg-white p-4 rounded-md absolute mt-10  shadow-lg `}>
          <h4 className='w-full text-center mb-3'>Update profile</h4>
          <form id='myform' className=' flex flex-col gap-3'>
            <div className='flex flex-col'>
              <label className='block text-sm font-medium text-gray-700 mb-1 ml-1'>username</label>
              <input className='border rounded-lg px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400' type="text" name='name' onChange={(e) => { handleChange(e) }} placeholder={userData.name} value={updatedData.name} />
            </div>
            <div className='flex flex-col'>
              <label className='block text-sm font-medium text-gray-700 mb-1 ml-1'>bio</label>
              <textarea className='border rounded-lg px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400' type="text" name='bio' onChange={(e) => { handleChange(e) }} placeholder={userData.bio ? userData.bio : "Enter bio"} value={updatedData.bio} />
            </div>
          </form>
          <div className='mt-3 w-full flex flex-row flex-wrap justify-center gap-3'>
            <button onClick={() => { setIsUpdata(false) }} className='border-1 border-zinc-400 w-24 py-2 rounded-lg bg-zinc-200 hover:bg-zinc-100 font-semibold text-black'>Cancel</button>
            <button onClick={(e) => { handleSubmit(e) }} form='myform' className='border-1 border-blue-700 w-24 py-2 rounded-lg bg-blue-600 hover:bg-blue-400 font-semibold text-white' type='submit'>Save</button>
          </div>
        </div>


        <div className={`${isDeletePage ? 'block' : 'hidden'} absolute h-auto w-72 p-3 delete-confirmation-modal bg-black text-white rounded-md`}>
          <h2>⚠️ Delete Account?</h2>
          <p>Are you sure you want to delete your account?</p>
          <ul>
            <li>All notes you have posted will be permanently deleted.</li>
            <li>You will no longer have access to your account or any of your data.</li>
            <li>You will no longer able to access notes uploaded by other as well.</li>
            <li>This action cannot be undone.</li>
          </ul>
          <div className="button-group flex flex-row flex-wrap justify-around">
            <button onClick={() => { setIsDeletePage(false) }} className="cancel-btn bg-blue-800 border-2 border-blue-800 rounded-lg px-3 py-1 font-semibold">Cancel</button>
            <button onClick={() => { HandelDelete() }} className="delete-btn bg-red-800 border-2 border-red-800 rounded-lg px-3 py-1 font-semibold">Delete</button>
          </div>
        </div>


        <div className="text-4xl w-20 h-20 rounded-full bg-blue-400 text-white font-bold flex items-center justify-center cursor-pointer border-2 border-black">
          {userData.name[0]}
        </div>
        <h2 className="text-2xl font-bold text-gray-800">{userData.name}</h2>
        <p className="text-gray-600 text-center max-w-lg">{userData.bio}</p>
        <div className='h-1/2 w-64 flex flex-row justify-around flex-wrap '>
          <span onClick={() => { setIsUpdata(true) }} className='px-3 py-1 font-bold rounded-md text-white bg-blue-700  border-2 border-blue-700 hover:bg-blue-400 hover:scale-0.02'>Update</span>
          <span onClick={() => { setIsDeletePage(true) }} className='px-3 py-1 font-bold rounded-md  bg-red-700 border-2 border-red-700 hover:bg-red-400 hover:scale-0.02'>delete</span>
        </div>

      </div>

      <div className="mt-10 flex justify-center items-center flex-col flex-wrap">
        <h3 className="text-xl font-semibold text-indigo-700 mb-4">Uploaded Notes</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {notes.map((notes, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md p-4 w-[18rem] hover:shadow-lg transition duration-300"
            >
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
                  Uploded on: <span className="font-medium">{notes.createdAt}</span>
                </p>
              </div>

              <div className="flex justify-between mt-4 gap-2 text-white">
                <a
                  href={`${backendURL}notes/readNote/${notes.id}`}
                  className="border-2 border-green-600 text-green-600 px-2 rounded-md text-sm font-medium transition w-1/2 flex justify-center items-center relative">
                  Preview
                </a>
                <a
                  href={`${backendURL}notes/download/${notes.id}`}
                  className="border-2 text-blue-600 px-2 py-2 rounded-md text-sm font-medium  transition w-1/2 text-center">
                  Download
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
