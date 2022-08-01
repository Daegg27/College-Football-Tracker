import { useState } from 'react'
import reactLogo from './assets/react.svg'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import NavBar from './components/NavBar.jsx'
import HomePage from './pages/HomePage.jsx'
import SignUpPage from './pages/SignUpPage'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'

function App() {

  return (
    <div className="App">
      <NavBar />
      <Router> 
        <Routes>
          <Route path='/' element={<HomePage/>} />
          <Route path='/signup' element={<SignUpPage/>} />
        </Routes>
      </Router>  
    </div>
  )
}

export default App
