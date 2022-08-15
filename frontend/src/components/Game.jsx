import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { useState, useEffect} from 'react'
import axios from 'axios'


function Game(props){
    const {currentGame, user, setSavedGames} = props

    const [information, setInformation] = useState(null)

    function FetchInformation(){
        axios.post(`search_for_team/${currentGame.id}`, {
            year: currentGame.season,
            gameID: currentGame.id,
            away_team: currentGame.away_team,
            home_team: currentGame.home_team,
            venue_id: currentGame.venue_id,
            start_time: currentGame.start_date
        }).then((response) => {
            console.log(response)
            setInformation(response.data)
        })
    }

    function RefreshSavedGames(){
        
        axios.get('/saved_games/', { params: { email: user.email } }).then((response) => {
            setSavedGames(response.data.classic_games)
          })
    }

    function SaveGame(){
        axios.put(`search_for_team/${currentGame.id}/save`, {
            away_team: currentGame.away_team,
            away_team_score: currentGame.away_points,
            home_team: currentGame.home_team,
            home_team_score: currentGame.home_points,
            email: user.email,
            year: currentGame.season,
            week: currentGame.week
        }).then((response) => {
            window.alert('You have succesfully saved this game!')
            RefreshSavedGames()
        })
    }

    useEffect(FetchInformation, [])
    


    return (
        <div>
            <Container id='secondary-container'>
                <h1>{currentGame.away_team} at {currentGame.home_team} <span id='season-year'>({currentGame.season})</span></h1>
                <hr />
                    {information != null ? 
                    <div>
                        <Row>
                            <Col sm='6'><h1><img src={information.away_team_image} className='team-logo'/>{currentGame.away_team} {information.away_mascot}: {currentGame.away_points}</h1></Col> 
                            <Col sm='6'><h1><img src={information.home_team_image} className='team-logo'/>{currentGame.home_team} {information.home_mascot}: {currentGame.home_points}</h1></Col>
                        </Row>
                        <Row>
                            <Col sm='6'>
                                <table>
                                    <tr>
                                        <th>1st</th>
                                        <th>2nd</th>
                                        <th>3rd</th>
                                        <th>4th</th>
                                    </tr>
                                    <tr>
                                        <td>{currentGame.away_line_scores[0]}</td>
                                        <td>{currentGame.away_line_scores[1]}</td>
                                        <td>{currentGame.away_line_scores[2]}</td>
                                        <td>{currentGame.away_line_scores[3]}</td>
                                    </tr>
                                </table>
                            </Col>
                            <Col sm='6'>
                                <table>
                                    <tr>
                                        <th>1st</th>
                                        <th>2nd</th>
                                        <th>3rd</th>
                                        <th>4th</th>
                                    </tr>
                                    <tr>
                                        <td>{currentGame.home_line_scores[0]}</td>
                                        <td>{currentGame.home_line_scores[1]}</td>
                                        <td>{currentGame.home_line_scores[2]}</td>
                                        <td>{currentGame.home_line_scores[3]}</td>
                                    </tr>
                                </table>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm='6'><h2 className='conference-name'>Conference: {currentGame.away_conference}</h2></Col>
                            <Col sm='6'><h2 className='conference-name'>Conference: {currentGame.home_conference}</h2></Col>
                        </Row>
                        <Row>
                            <Col sm='6'><h2>Passing Yards: {information.away_passing_yards}</h2></Col>
                            <Col sm='6'><h2>Passing Yards: {information.home_passing_yards}</h2></Col>
                        </Row>
                        <Row>
                            <Col sm='6'><h2>Rushing Yards: {information.away_rushing_yards}</h2></Col>
                            <Col sm='6'><h2>Rushing Yards: {information.home_rushing_yards}</h2></Col>
                        </Row>
                        <Row>
                            <Col sm='6'><h2>Turnovers: {information.away_turnovers}</h2></Col>
                            <Col sm='6'><h2>Turnovers: {information.home_turnovers}</h2></Col>
                        </Row>
                        {information.away_sacks && 
                        <Row>
                            <Col sm='6'><h2>Sacks: {information.away_sacks} <span><h5>qb hurries ({information.away_qb_hurries})</h5></span></h2></Col>
                            <Col sm='6'><h2>Sacks: {information.home_sacks} <span><h5>qb hurries ({information.home_qb_hurries})</h5></span></h2></Col>
                        </Row> }
                        <Row>
                            <Col sm='6'><h1>Time of Possesion: {information.away_time_of_possession}</h1></Col>
                            <Col sm='6'><h1>Time of Possesion: {information.home_time_of_possession}</h1></Col>
                        </Row>
                        <hr />
                        <h1>{information.stadium_name}</h1>
                        {information.weather_available ? 
                        <div>
                            <h2>Weather information is only available for games past 2010</h2>
                            <hr></hr>
                        </div> : 
                        <div>
                            <h4>Kickoff was at {information.local_time} with {information.weather_condition} conditions!</h4>
                            <h4>Temperature: {information.temperature}F</h4>
                            <h5>Humidity: {information.humidity}%</h5>
                            <h6>Wind Speed: {information.wind_speed}MPH</h6>
                            <hr />
                        </div>}
                        {user && <button onClick={SaveGame}>SAVE</button>}
                    </div> : <h1>Loading..</h1>} 
            </Container>
            
        </div>
    )

}

export default Game