import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { useState, useEffect, useRef} from 'react'
import axios from 'axios'

function MatchHistoryPage(props){
    const {teamNames} = props
    
    const[matchHistory, setMatchHistory] = useState(null)
    const isMounted = useRef(false)

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
        })
      }

    function testSomething(){
        console.log(matchHistory.games[matchHistory.games.length - 1])
    }

    useEffect(() => {
        if (isMounted.current) {
          testSomething();
        } else {
          isMounted.current = true;
        }
      }, [matchHistory]);
    

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
                <hr></hr>
                {matchHistory ? 
                <div>
                    <h1><strong>{document.getElementById('team-one-name').value}</strong>: {matchHistory.team1Wins} wins || <strong>{document.getElementById('team-two-name').value}</strong>: {matchHistory.team2Wins} wins</h1>
                </div> : <br></br>}
            </Container>
        </div>
    )
}

export default MatchHistoryPage