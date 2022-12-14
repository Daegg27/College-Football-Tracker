import axios from 'axios'
import Container from 'react-bootstrap/Container';
import { useEffect, useState } from 'react'
import { Link } from "react-router-dom"



function SavedGamePage(props){
    const {savedGames, setCurrentGame, user} = props

    function viewIndividualGame(gameID, year){
        axios.post('saved_games/', {
            gameID: gameID,
            year: year
        }).then((response) => {
            setCurrentGame(response.data.game_data)
            window.location.href = `/#/search_by_team/${gameID}`
        })
    }

    function UnfavoriteGame(gameID){
        axios.delete('saved_games/delete', { data: 
            { 
                gameID: gameID,
                userEmail: user.email
            } }
        ).then((response) => {
            alert('You have removed this from your Classic Games!')
            window.location.reload()
        })
    }

    useEffect(() => {
        setCurrentGame(null)
    }, [])


return (
    <div>
        <Container id='secondary-container'>
        <h1>Welcome to a list of your very own personalized classic college football games!</h1>
        {savedGames.map((game) => {
                    return <div>
                        <p>Week {game.week}. {game.home_team}: <strong>{game.home_team_score}</strong> vs. {game.away_team}: <strong>{game.away_team_score}</strong> <span id='season-year'>({game.year})</span></p>
                        <button onClick={() => viewIndividualGame(game.game_id, game.year)} className='saved-buttons'>View Game</button>
                        <button onClick={() => UnfavoriteGame(game.game_id)} className='saved-buttons'>Remove Game</button>
                        <hr></hr>
                    </div>
            })}
        </Container>
    </div>
)

}

export default SavedGamePage