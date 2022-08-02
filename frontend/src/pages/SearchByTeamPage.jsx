import axios from 'axios'
import Container from 'react-bootstrap/Container';
import { useEffect, useState } from 'react'


function SearchByTeamPage(){

    const [games, setGames] = useState([])


    return (
        <div>
            <Container id='secondary-container'>
                <h1><strong>Please search for whatever team you'd like!</strong></h1>
                <form>
                    <label for="team-name">Please enter a school name:</label><br></br>
                    <input type="text" id='team-name'/><br></br>
                    <label for="season-year">What year are you looking for?</label><br></br>
                    <input type="text" id='season-year'/><br></br>
                    <div className="py-2"></div>
                    <button>SUBMIT</button>
                </form>
            </Container>
        </div>
    )
}


export default SearchByTeamPage