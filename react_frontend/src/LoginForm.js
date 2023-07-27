// LoginForm.js
import React, { useState } from 'react';

function LoginForm({ onLogin }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        const usernameRegex = /^[a-z0-9]+$/i;
        if (!usernameRegex.test(username) || username.length < 4 || username.length > 50) {
            alert('Invalid username. Usernames can only contain alphanumeric characters and must be between 4 and 50 characters.');
            return;
        }

        if (password.length < 2 || password.length > 100) {
            alert('Invalid password. Passwords must be between 2 and 100 characters.');
            return;
        }

        const response = await fetch('http://localhost:8000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        if (response.ok) {
            const data = await response.json();
            onLogin(data);
        } else {
            alert('Login failed');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Username:
                <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
            </label>
            <label>
                Password:
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
            </label>
            <button type="submit">Login</button>
        </form>
    );
}

export default LoginForm;
