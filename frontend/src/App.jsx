import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import NavBar from './components/NavBar.jsx'
import HomePage from './pages/HomePage.jsx'
import SignUpPage from './pages/SignUpPage'
import axios from 'axios'
import SearchByTeamPage from './pages/SearchByTeamPage'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'



const getCSRFToken = ()=>{
  let csrfToken

  // the browser's cookies for this page are all in one string, separated by semi-colons
  const cookies = document.cookie.split(';')
  for ( let cookie of cookies ) {
      // individual cookies have their key and value separated by an equal sign
      const crumbs = cookie.split('=')
      if ( crumbs[0].trim() === 'csrftoken') {
          csrfToken = crumbs[1]
      }
  }
  return csrfToken
}

axios.defaults.headers.common['X-CSRFToken'] = getCSRFToken()


function App() {

  const [user, setUser] = useState(null)


  const whoAmI = async () => {
    const response = await axios.get('/whoami')
    const user = response.data && response.data[0] && response.data[0].fields
    console.log('user from whoami? ', user, response)
    setUser(user)
  }

  useEffect(()=>{
    whoAmI()
  }, [])

  return (
    <div className="App">
      <NavBar />
      <Router> 
        <Routes>
          <Route path='/' element={<HomePage/>} />
          <Route path='/signup' element={<SignUpPage/>} />
          <Route path='/search_by_team' element={<SearchByTeamPage/>} />
        </Routes>
      </Router>  
    </div>
  )
}

export default App
