import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { useState, useEffect, useRef} from 'react'
import axios from 'axios'

function MatchHistoryPage(props){
    const {teamNames, setCurrentGame} = props
    
    const[matchHistory, setMatchHistory] = useState(null)
    const[latestGame, setLatestGame] = useState(null)

    function getMatchHistory(event){
        event.preventDefault()
        
        let teamOne = document.getElementById('team-one-name').value
        let teamTwo = document.getElementById('team-two-name').value


        if (teamOne == teamTwo){
            alert('The same team cannot play each other, please pick two different teams!')
            return null
        }

        axios.get('/match_history',
        { params: { teamone: document.getElementById('team-one-name').value, teamtwo: document.getElementById('team-two-name').value } })
        .then((response) => {
            setMatchHistory(response.data.information)
            if (response.data.last_game){
                setLatestGame(response.data.last_game)
            }
            else
            {
                setLatestGame(null)
            }
            console.log(response)
        })
      }

      function viewIndividualGame(gameID, year){
        axios.post('saved_games/', {
            gameID: gameID,
            year: year
        }).then((response) => {
            setCurrentGame(response.data.game_data)
            window.location.href = `/#/search_by_team/${gameID}`
        })
    }
    

    useEffect(() => {
        setCurrentGame(null)
    }, null)

    return (
        <div>
            <Container id='secondary-container'>
                <h1>Get the latest head-to-head results for any FBS DIV-I Schools</h1>
                <form onSubmit={getMatchHistory}>
                <label for="team-one-name">Please select the first school:</label><br></br>
                    <select name="team-one" id="team-one-name">
                        {teamNames.map((team) => {
                            return (
                                <option value={team.school}>{team.school}</option>
                            )
                        })}
                    </select><br></br>
                    <label for="team-two-name">Please select the second school:</label><br></br>
                    <select name="team-two" id="team-two-name">
                        {teamNames.map((team) => {
                            return (
                                <option value={team.school}>{team.school}</option>
                            )
                        })}
                    </select><br></br>
                    <div className="py-2"></div>
                    <button type='submit'>SUBMIT</button>
                </form>
                {matchHistory ? 
                <div>
                    <hr></hr>
                    <h1><strong>{document.getElementById('team-one-name').value}</strong>: {matchHistory.team1Wins} wins || <strong>{document.getElementById('team-two-name').value}</strong>: {matchHistory.team2Wins} wins <span id='season-year'>({matchHistory.ties} ties)</span></h1>
                </div> : <br></br>}
                <div className="py-3"></div>
                {latestGame ?
                <div>
                    <hr></hr>
                    <h1>Lastest Matchup: {latestGame.awayTeam}: <strong>{latestGame.awayScore}</strong> at {latestGame.homeTeam}: <strong>{latestGame.homeScore}</strong> <span id='season-year'>({latestGame.season}) {latestGame.seasonType == 'postseason' ? <span>(postseason)</span> : <br></br>}</span> </h1>
                    {latestGame.season > 2003 ? 
                    <div>
                        <button onClick={() => viewIndividualGame(latestGame.game_id, latestGame.season)}>View Game</button> 
                        <div className="py-1"></div>
                    </div>
                    : <br></br>
                    }
                </div> : <br></br>}
            </Container>
        </div>
    )
}

export default MatchHistoryPage