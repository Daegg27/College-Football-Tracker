import axios from 'axios'
import Container from 'react-bootstrap/Container';
import { useEffect, useState } from 'react'
import { Link } from "react-router-dom"



function SavedGamePage(props){
    const {savedGames} = props


return (
    <div>
        <Container id='secondary-container'>
        <h1>Welcome to a list of your very own personalized classic college football games!</h1>
        {savedGames.map((game) => {
                    return <div>
                        <p>{game.home_team} vs. {game.away_team} <span id='season-year'>({game.year})</span></p>
                        <hr></hr>
                    </div>
            })}
        </Container>
    </div>
)

}

export default SavedGamePage