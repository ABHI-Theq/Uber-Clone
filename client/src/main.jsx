import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Toaster } from 'react-hot-toast'
import { BrowserRouter } from 'react-router-dom'
// import
import './index.css'
import App from './App.jsx'
import UserContext from './context/UserContext.jsx'
import AuthContextProvider from './context/AuthContext.jsx'
import CaptainContexrtProvider from './context/CaptainContext.jsx'
import SocketContextProvider from './context/SocketContext.jsx'

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
    <UserContext>
        <AuthContextProvider>
    <CaptainContexrtProvider>
        <SocketContextProvider>
        <Toaster/>
    <App />
    </SocketContextProvider>
    </CaptainContexrtProvider>
    </AuthContextProvider>
    </UserContext>
    </BrowserRouter>
)
