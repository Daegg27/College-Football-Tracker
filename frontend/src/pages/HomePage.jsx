import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'


function HomePage(){

    return (
    <div>
        <div className="py-1"></div>
        <h1>The exclusive place for everything College Football!</h1>
        <Container>
            <div className="py-4"></div>
            <Row>
                <Col sm='6'><img src="https://media.pff.com/2022/02/Image-from-iOS.jpg" alt="Reload the page" className='homepage-image'/></Col>
                <Col sm='6'>
                    <h3 id='first-subheader'>Relive all of your favorite memories from the best time of the year.</h3>
                    <h3 id='second-subheader'>Don't let the analyst tell you what defines a classic game. Create your own custom list by creating a free account today!</h3>
                </Col>
            </Row>
        </Container>
    </div>
    )
}

export default HomePage