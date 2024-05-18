import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import LogIn from './SignIn/Pages/Login.jsx';
import SignUp from './SignIn/Pages/SignUp.jsx';
import Update from './SignIn/Pages/Update.jsx';
import { AuthorizeUser } from './SignIn/middleware/auth.jsx';
import Recovery from './SignIn/Pages/forgot.jsx';
import Username from './SignIn/Pages/username.jsx';
import Reset from './SignIn/Pages/Reset.jsx';
import Chat from './Chat/chat.jsx';
ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/login" element={<LogIn />} />
      <Route path="/signUp" element={<SignUp />} />
      <Route path="/forgotPassword" element={<Recovery />} />
      <Route path="/update" element={<AuthorizeUser><Update/></AuthorizeUser>}/>
      <Route path="/username" element={<Username/>}/>
      <Route path="/chat" element={<Chat/>}/>
      <Route path="/Reset" element={<Reset />} />
    </Routes>
  </BrowserRouter>
)
