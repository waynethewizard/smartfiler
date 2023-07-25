import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function Navigation() {

    return (
        <Navbar bg="#004953" data-bs-theme="dark" >
            <Container>
                <Navbar.Brand href="#home">Smartfiler</Navbar.Brand>
                <Nav className="justify-content-end">
                    <Nav.Link href="#home">Home</Nav.Link>
                    <Nav.Link href="#features">Features</Nav.Link>
                    <Nav.Link href="#pricing">Pricing</Nav.Link>
                </Nav>
            </Container>
            <Container>
                <Nav className="justify-content-end">
                    <Nav.Link href="#login">Login</Nav.Link>
                    <Nav.Link href="#login">Sign Up</Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    )
}

export default Navigation