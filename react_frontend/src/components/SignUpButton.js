import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'

const SignUpButton = ({handleLogin}) => {
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const handleClose = () => {
        setShow(false);
        handleLogin();
    }

    // add form and call for logging in/signing
    
    return (
        <div>
            <div>
                <Button >Sign Up</Button>
            </div>
        </div>
        
    )

}

export default SignUpButton
