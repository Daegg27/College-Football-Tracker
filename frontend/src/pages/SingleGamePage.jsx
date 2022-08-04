import { useParams } from 'react-router-dom';

function SingleGamePage(){

    let {gameID} = useParams() 
    return (
        <div>
            <h1>This is {gameID}</h1>
        </div>
    )

}

export default SingleGamePage