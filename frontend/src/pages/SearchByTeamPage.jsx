import axios from 'axios'
import Container from 'react-bootstrap/Container';
import { useEffect, useState } from 'react'
import { Link } from "react-router-dom"


function SearchByTeamPage(props){
    const {setGames, setTeams, setWins, setLosses, games, team, wins, losses, setCurrentGame} = props



    function searchForTeam(event){
        event.preventDefault()

        let team_name = document.getElementById('team-name')
        let season = document.getElementById('season-year')

        axios.post('search_for_team/', {
            'team': team_name.value,
            'year': season.value
        }).then((response) => {
            setGames(response.data.list_of_games)
            setTeams(response.data.team)
            setWins(response.data.wins)
            setLosses(response.data.losses)
        })
    }
    console.log(games)

    useEffect(() => { 
        // console.log('resetting list of games')
        setGames([])
        setCurrentGame(null)
        setTeams(null)
    }, [])


    return (
        <div>
            <Container id='secondary-container'>
                <h1><strong>Please search for whatever team you'd like!</strong></h1>
                <form onSubmit={searchForTeam}>
                    <label for="team-name">Please enter a school name:</label><br></br>
                    <input type="text" id='team-name'/><br></br>
                    <label for="season-year">What year are you looking for?</label><br></br>
                    <input type="text" id='season-year'/><br></br>
                    <div className="py-2"></div>
                    <button type='SUBMIT'>SUBMIT</button>
                </form>
                <hr></hr>
                {team != null && <h1><strong>{team}</strong> was ({wins}-{losses})</h1>}
                <hr></hr>
                {games.length != 0 && games.map((game) => {
                    return <div>
                        <p><Link to={`/search_by_team/${game.id}`}>Week {game.week}</Link>, {game.home_team}: {game.home_points} vs. {game.away_team}: {game.away_points}</p>
                        <hr></hr>
                    </div>
            })}
            </Container>
        </div>
    )
}


export default SearchByTeamPage