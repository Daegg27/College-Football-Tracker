import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { useState, useEffect} from 'react'
import axios from 'axios'

function MatchHistoryPage(props){
    const {teamNames} = props

    return (
        <div>
            <Container id='secondary-container'>
                <h1>Welcome to the Match History Page</h1>
                <form>
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
                </form>
                <hr></hr>
            </Container>
        </div>
    )
}

export default MatchHistoryPage