import axios from 'axios'
import Container from 'react-bootstrap/Container';
import { useEffect, useState } from 'react'


function SearchByTeamPage(){

    const [games, setGames] = useState([])
    const [team, setTeams] = useState(null)



    function searchForTeam(event){
        event.preventDefault()

        let team_name = document.getElementById('team-name')
        let season = document.getElementById('season-year')

        axios.post('search_for_team/', {
            'team': team_name.value,
            'year': season.value
        }).then((response) => {
            console.log(response)
            setGames(response.data.list_of_games)
            setTeams(response.data.team)
        })
    }
    console.log(games)



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
            {games.length != 0 && games.map((game) => {
                return <div>
                    <p>Week.{game.week} for {team}</p>
                    <hr></hr>
                </div>
            })}
            </Container>
        </div>
    )
}


export default SearchByTeamPage