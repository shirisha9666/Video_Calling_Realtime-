
import { Route, Routes } from 'react-router-dom'
import HomePage from "./pages/Homepage"
import './App.css'
import SignupPage from './pages/SignupPage'
import LoginPage from './pages/LoginPage'
import NotificationPage from './pages/NotificationPage'
import OnboaringPage from './pages/OnboaringPage'
import ChatPage from './pages/ChatPage'
import CallPage from './pages/CallPage'
import { Toaster } from "react-hot-toast"

function App() {


  return (
    <div className='h-screen' data-theme="night" >
     
<Routes>
  <Route path='/' element={<HomePage/>}/>
  <Route path='/signup' element={<SignupPage/>}/>
  <Route path='/login' element={<LoginPage/>}/>
  <Route path='/notifications' element={<NotificationPage/>}/>
  <Route path='/call' element={<CallPage/>}/>
  <Route path='/chat' element={<ChatPage/>}/>
  <Route path='/onboarding' element={<OnboaringPage/>}/>
</Routes>

<Toaster />
   
    </div>
  )
}

export default App
