import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const LoginButton = ({isLoggedIn}) => {
    
    const handleClick = (e) => {
        e.preventDefault()
        isLoggedIn()
    }

    return (
        <Navbar bg="#004953" data-bs-theme="dark" className="justify-content-end" >
            <Container className="d-flex justify-content-start">
                <Nav >
                    <Nav.Link href="#login" onClick={handleClick} >Login</Nav.Link>
                    <Nav.Link href="#login" >Sign Up</Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    )

}

export default LoginButton
