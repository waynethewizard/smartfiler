import Button from 'react-bootstrap/Button';

const LogoutButton = ({handleLogout}) => {
    
    return (
        <div>
            <div>
                <Button onClick={handleLogout}> Logout </Button>
            </div>
        </div>
        
    )

}

export default LogoutButton