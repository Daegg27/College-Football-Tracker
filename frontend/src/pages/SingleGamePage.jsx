import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react'

function SingleGamePage(props){
    const {team, games} = props

    let {gameID} = useParams() 
    const [currentGame, setCurrentGame] = useState([])

    function FetchProperGame(){
        console.log(games, 'inside Fetch')
        for (let game of games){
            console.log(game, games)
            if (gameID == game.id){
                setCurrentGame(game)
                console.log('this is the game', game.id)
            }
            else
            {
                console.log('not the game', game.id)
            }
            console.log(currentGame)
        }
    }
    useEffect(FetchProperGame, [])

    

    return (
        <div>
            <h1>This is {gameID} for {team}</h1>
        </div>
    )

}

export default SingleGamePage