import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react'
import Game from '../components/Game';

function SingleGamePage(props){
    const {team, games, user, currentGame, setCurrentGame, setSavedGames} = props

    let {gameID} = useParams() 
    

    function FetchProperGame(){
        if (games){
            for (let game of games){
                if (gameID == game.id){
                    console.log(game)
                    setCurrentGame(game)
                    // console.log('this is the game', game.id)
                }
            }
        }
    }
    useEffect(FetchProperGame, [])

    

    return (
        <div>
            {currentGame != null && <Game currentGame={currentGame} user={user} setSavedGames={setSavedGames}/>}
        </div>
    )

}

export default SingleGamePage