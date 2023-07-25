import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function Login() {

    return (
        <div>
            <Navbar bg="#004953" data-bs-theme="dark" className="justify-content-end" >
                <Container className="d-flex justify-content-start">
                    <Nav >
                        <Nav.Link href="#login">Login</Nav.Link>
                        <Nav.Link href="#login">Sign Up</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        </div>
    )

}

export default Login
