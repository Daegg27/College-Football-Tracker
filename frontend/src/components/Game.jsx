import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { useState, useEffect } from 'react'
import axios from 'axios'


function Game(props){
    const {currentGame} = props

    function FetchInformation(){
        axios.post(`search_for_team/${currentGame.id}`, {
            year: currentGame.season,
            away_team: currentGame.away_team,
            home_team: currentGame.home_team
        }).then((response) => {
            console.log(response)
        })
    }

    useEffect(FetchInformation, [])
    


    return (
        <div>
            <Container id='secondary-container'>
                <h1>{currentGame.away_team} at {currentGame.home_team}</h1>
                <Row>
                    <Col sm='6'><h1>{currentGame.away_team}: {currentGame.away_points}</h1></Col>
                    <Col sm='6'><h1>{currentGame.home_team}: {currentGame.home_points}</h1></Col>
                </Row>
            </Container>
            
        </div>
    )

}

export default Game