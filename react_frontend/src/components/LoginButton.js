import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'
import SignUpButton from './SignUpButton';

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
                        <Nav.Link href="#login" onClick={handleShow} >Login </Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
            <div>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="disabledTextInput">Disabled input</Form.Label>
                            <Form.Control id="disabledTextInput" placeholder="Disabled input" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="disabledSelect">Disabled select menu</Form.Label>
                            <Form.Select id="disabledSelect">
                                <option>Disabled select</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Check
                                type="checkbox"
                                id="disabledFieldsetCheck"
                                label="Can't check this"
                            />
                        </Form.Group>
                            <Button type="submit" onClick={handleClose}>Submit</Button>
                    </Form>
                </Modal>
            </div>
        </div>
        
    )

}

export default LoginButton
