import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { useState, useEffect } from 'react'
import axios from 'axios'


function Game(props){
    const {currentGame} = props

    const [information, setInformation] = useState(null)

    function FetchInformation(){
        axios.post(`search_for_team/${currentGame.id}`, {
            year: currentGame.season,
            away_team: currentGame.away_team,
            home_team: currentGame.home_team
        }).then((response) => {
            console.log(response)
            setInformation(response.data)
        })
    }

    useEffect(FetchInformation, [])
    


    return (
        <div>
            <Container id='secondary-container'>
                <h1>{currentGame.away_team} at {currentGame.home_team}</h1>
                <hr />
                <Row>
                    {information != null && <Col sm='6'><h1><img src={information.away_team_image} className='team-logo'/>{currentGame.away_team} {information.away_mascot}: {currentGame.away_points}</h1></Col> }
                    {information != null && <Col sm='6'><h1><img src={information.home_team_image} className='team-logo'/>{currentGame.home_team} {information.home_mascot}: {currentGame.home_points}</h1></Col> } 
                </Row>
            </Container>
            
        </div>
    )

}

export default Game