import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { AuthContextProvider } from './context/AuthContext'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <BrowserRouter>
        <ToastContainer
          position="top-center"
          autoClose={2000}
          pauseOnHover={true}
          closeOnClick={true}
          draggable={true}
        />
        <App />
      </BrowserRouter>
    </AuthContextProvider>
  </React.StrictMode>
)
