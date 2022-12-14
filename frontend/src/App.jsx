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
import SavedGamePage from './pages/SavedGamesPage'
import MatchHistoryPage from './pages/MatchHistoryPage'



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
  const [currentGame, setCurrentGame] = useState(null)
  const [savedGames, setSavedGames] = useState([])
  const [teamNames, setTeamNames] = useState(null)


  const whoAmI = async () => {
    const response = await axios.get('/whoami')
    const user = response.data && response.data[0] && response.data[0].fields
    // console.log('user from whoami? ', user)
    // console.log('-------THIS IS THE RESPOSNE-----', response)
    setUser(user)
  }

  function fetchSavedGames(){
    if (user){
      axios.get('/saved_games/').then((response) => {
        setSavedGames(response.data.classic_games)
        // console.log(response)
    })
    }
    else
    {
      setSavedGames([]) 
    }
  }


  function GrabTeamNames(){
    axios.get('/populate_teams').then((response) => {
        setTeamNames(response.data.teams)
        console.log(teamNames)
    })
}

  useEffect(()=>{
    whoAmI()
  }, [])

  useEffect(fetchSavedGames, [user])

  useEffect(GrabTeamNames, [])

  


  return (
    <div className="App">
      <NavBar user={user}/>
      <Router> 
        <Routes>
          <Route path='/' element={<HomePage/>} />
          <Route path='/signup' element={<SignUpPage teamNames={teamNames}/>} />
          <Route path='/search_by_team' element={<SearchByTeamPage setGames={setGames} setTeams={setTeams} setWins={setWins} setLosses={setLosses} games={games} team={team} wins={wins} losses={losses} setCurrentGame={setCurrentGame} teamNames={teamNames}/>} />
          <Route path='/search_by_team/:gameID' element={<SingleGamePage team={team} games={games} user={user} currentGame={currentGame} setCurrentGame={setCurrentGame} setSavedGames={setSavedGames}/>}/>
          <Route path='/saved_games' element={user ? <SavedGamePage savedGames={savedGames} setCurrentGame={setCurrentGame} user={user}/> : <SignUpPage />} />
          <Route path='/match_history' element={<MatchHistoryPage teamNames={teamNames} setCurrentGame={setCurrentGame}/>}></Route>
        </Routes>
      </Router>  
    </div>
  )
}

export default App
