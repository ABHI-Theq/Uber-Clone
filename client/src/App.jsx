import { useState,useCallback,useEffect } from 'react'
import { Route,Routes } from 'react-router-dom'
import Start from './pages/Start.jsx'
import UserLogin from './pages/UserLogin.jsx'
import UserSignUP from './pages/UserSignUP.jsx'
import CaptainLogin from './pages/CaptainLogin.jsx'
import CaptainSignup from './pages/CaptainSignup.jsx'
import UserProtectWrapper from './pages/UserProtectWrapper.jsx'
import Home from './pages/Home.jsx'
import UserLogout from './pages/UserLogout.jsx'
import CaptainHome from './pages/CaptainHome.jsx'
import CaptainProtectWrapper from './pages/CaptainProtectWrapper.jsx'
import Riding from './pages/Riding.jsx'
import CaptainRiding from './pages/CaptainRiding.jsx'

function App() {

  return (
    
    <Routes>
      <Route path='/' element={<Start/>}/>
      <Route path='/login' element={<UserLogin/>}/>
      <Route path='/signup' element={<UserSignUP/>}/>
      <Route path='/captain-login' element={<CaptainLogin/>}/>
      <Route path="/captain-signup" element={<CaptainSignup/>} />
      <Route path="/riding" element={<Riding/>} />
      <Route path="/captain-riding" element={<CaptainRiding />} />
      <Route path="/home" element={
        <UserProtectWrapper>
          <Home/>
        </UserProtectWrapper>
      } />
      <Route path="/logout" element={
        <UserProtectWrapper>
          <UserLogout/>
        </UserProtectWrapper>
      } />
      <Route path="/captain-home" element={
        <CaptainProtectWrapper>
        <CaptainHome/>
        </CaptainProtectWrapper>
      }/>
    </Routes>
      )
}

export default App
