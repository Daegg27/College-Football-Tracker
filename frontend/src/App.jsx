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
import SingleGamePage from './pages/SingleGamePage'



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
  const [games, setGames] = useState([])
  const [team, setTeams] = useState(null)
  const [wins, setWins] = useState(null)
  const [losses, setLosses] = useState(null)


  const whoAmI = async () => {
    const response = await axios.get('/whoami')
    const user = response.data && response.data[0] && response.data[0].fields
    console.log('user from whoami? ', user, response)
    setUser(user)
  }

  useEffect(()=>{
    whoAmI()
  }, [])

  function makeAPICall(){
    console.log('button clicked')
    axios.get('/test/').then((response) => {
      console.log(response)
    })
  }

  return (
    <div className="App">
      <NavBar />
      <button onClick={makeAPICall}>Test.com</button>
      <Router> 
        <Routes>
          <Route path='/' element={<HomePage/>} />
          <Route path='/signup' element={<SignUpPage/>} />
          <Route path='/search_by_team' element={<SearchByTeamPage setGames={setGames} setTeams={setTeams} setWins={setWins} setLosses={setLosses} games={games} team={team} wins={wins} losses={losses}/>} />
          <Route path='/search_by_team/:gameID' element={<SingleGamePage team={team} games={games}/>}/>
        </Routes>
      </Router>  
    </div>
  )
}

export default App
