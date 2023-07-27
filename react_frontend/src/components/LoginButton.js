import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';

const LoginButton = ({handleLogin}) => {
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const handleClose = () => {
        setShow(false);
        handleLogin();
    }

    // add form and call for logging in/signing
    
    return (
        <div>
            <Navbar bg="#004953" data-bs-theme="dark" className="justify-content-end" >
                <Container className="d-flex justify-content-start">
                    <Nav >
                        <Nav.Link href="#login" onClick={handleShow} >Login</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
            <div>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Login or Signup</Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>
        
    )

}

export default LoginButton
