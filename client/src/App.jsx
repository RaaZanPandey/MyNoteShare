import { Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import './App.css'
import Home from './pages/Home'
import Login from './pages/Login'
import EmailVerify from './pages/EmailVerify'
import ResetPassword from './pages/ResetPassword'
import Menubar from './component/Menubar';
import Getnotes from './pages/Getnotes';
import PostNote from './pages/PostNote';
import Feedback from './pages/Feedback';
import Profile from './pages/Profile';

function App() {


  return (
    <div>
      
      <ToastContainer />
        <Menubar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/getnotes" element={<Getnotes />} />
          <Route path="/login" element={<Login />} />
          <Route path="/email-verify" element={<EmailVerify />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path='/uploadnote' element={<PostNote/>}/>
           <Route path='/feedback' element={<Feedback/>}/>
              <Route path='/profile' element={<Profile/>}/>
        </Routes>
    </div>
  )
}

export default App
