import axios from 'axios'
import Container from 'react-bootstrap/Container';

function SignUpPage(){


    function testSignUp(){
        axios.post('/signup/', {email: 'egglestondalton@yahoo.com', password:'dragons'}).then((response)=>{
        console.log('response from server: ', response)
    })
  }

    

    return (
        <div>
            <h1>This is the sign up page, please create an account for full access</h1>
            <Container id='secondary-container'>
                <form>
                    <label for='email'>Please Enter your email:</label><br></br>
                    <input type="text" id="email" placeholder='enter email'/><br></br>
                    <label for="password">Please create a password:</label><br></br>
                    <input type="password" id='password' placeholder='enter password'/><br></br>
                    <button onClick={testSignUp}>SignUp</button>
                </form>
            </Container>
            
        </div>
    )
}

export default SignUpPage