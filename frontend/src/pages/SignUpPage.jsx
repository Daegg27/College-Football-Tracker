import axios from 'axios'
import Container from 'react-bootstrap/Container'


function SignUpPage(){


    function SignUp(event){
        event.preventDefault()

        let email = document.getElementById('email') 
        let password = document.getElementById('password')

        axios.post('/signup/', {email: email.value, password: password.value}).then((response)=>{
        console.log('response from server: ', response)
    })
  }

    function LogIn(event){
        event.preventDefault()

        let email = document.getElementById('email') 
        let password = document.getElementById('password')

        axios.post('/login/', {email: email.value, password: password.value}).then((response)=>{
          console.log('response from server: ', response)
          window.location.reload()
        })
      }

    

    return (
        <div>
            <Container id='secondary-container'>
            <h1><strong>This is the sign up page, please create an account for full access</strong></h1>
                <form>
                    <label for='email'>Please enter your email:</label><br></br>
                    <input type="text" id="email" placeholder='enter email'/><br></br>
                    <label for="password">Please enter a password:</label><br></br>
                    <input type="password" id='password' placeholder='enter password'/><br></br>
                    <div className="py-3"></div>
                    <button onClick={SignUp}>Sign Up</button>
                    <hr />
                    <div className="py-1"></div>
                    <h4>Or click here to login:</h4>
                    <button onClick={LogIn}>Log In</button>
                    <div className="py-1"></div>
                </form>
            </Container>
            
        </div>
    )
}

export default SignUpPage