import axios from 'axios'
import Container from 'react-bootstrap/Container';
import { useEffect, useState, useRef } from 'react'
import { Link } from "react-router-dom"


function SearchByTeamPage(props){
    const {setGames, setTeams, setWins, setLosses, games, team, wins, losses, setCurrentGame, teamNames} = props

    const[regularSeasonGames, setRegularSeasonGames] = useState([])
    const[postseasonGames, setPostseasonGames] = useState([])
    const isMounted = useRef(false)



    function searchForTeam(event){
        event.preventDefault()

        let team_name = document.getElementById('team-name')
        let season = document.getElementById('season-year')

        if (season.value < 2004){
            alert('Information is only available for games past 2004')
            return null
        }
        else if (season.value > 2021){
            alert('The 2022 season has yet to begin')
            return null
        }

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
        if (isMounted.current)
         {
          let regularGames = games.filter((game) => 
            game.season_type == 'regular'
          )
          setRegularSeasonGames(regularGames)
          
          let postGames = games.filter((game) => {
            return game.season_type == 'postseason'
          })
          setPostseasonGames(postGames)
        } 
        else 
        {
          isMounted.current = true;
        }
      }, [games]);
    
    


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
                    <label for="team-name">Please select a school name:</label><br></br>
                    <select name="teams" id="team-name">
                        {teamNames.map((team) => {
                            return (
                                <option value={team.school}>{team.school}</option>
                            )
                        })}
                    </select><br></br>
                    <label for="season-year">What year are you looking for?</label><br></br>
                    <input maxLength='4' type="text" id='season-year' placeholder='Pick between 2004-2021'/><br></br>
                    <div className="py-2"></div>
                    <button type='SUBMIT'>SUBMIT</button>
                </form>
                <hr></hr>
                {team != null && <h1><strong>{team}</strong> was ({wins}-{losses})</h1>}
                <hr></hr>
                {regularSeasonGames.length != 0 && regularSeasonGames.map((game) => {
                    return <div>
                        <p><Link to={`/search_by_team/${game.id}`}>Week {game.week}</Link>, {game.home_team}: {game.home_points} vs. {game.away_team}: {game.away_points}</p>
                        <hr></hr>
                    </div>
            })}
            {postseasonGames.length != 0 && postseasonGames.map((game) => {
                    return <div>
                        <p><Link to={`/search_by_team/${game.id}`}>{game.season_type}</Link>, {game.home_team}: {game.home_points} vs. {game.away_team}: {game.away_points}</p>
                        <hr></hr>
                    </div>
            })}
            </Container>
        </div>
    )
}


export default SearchByTeamPage