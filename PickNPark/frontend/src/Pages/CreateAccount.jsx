import {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import {useAuth} from "../context/AuthContext.js";

const CreateAccount = () => {
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { signup, isAuthenticated } = useAuth();

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/');
        }
    }, [isAuthenticated]);

    const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        console.log('Sending Request:', {
            username: userName,
            email: email,
            password: password,
        });

        const response = await fetch('http://localhost:5000/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: userName,
                email: email,
                password: password,
            }),
        });

        const data = await response.json();
        console.log('Response:', data);

        if (response.ok) {
            alert('Account created successfully!');
            navigate('/'); // Redirect to the login page
        } else {
            alert(data.message || 'Failed to create account');
        }
    } catch (error) {
        console.error('Error creating account:', error);
        alert('An error occurred. Please try again.');
    }
};

    return (
        <div style={{ 
            textAlign: 'center',
            marginTop: '50px', 
            paddingTop: '15rem',
            paddingBottom: '25rem', 
            borderRadius: '10px', }}>
            <div style={{ 
                backgroundColor: '#f0f0f0',
                padding: '40px',
                borderRadius: '10px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                maxWidth: '400px',
                margin: '0 auto',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                }}>
                <h1 style={{
                fontSize:"2.5rem",
                paddingBottom:"20px"}}>Create Account</h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <input
                            type="text"
                            name="username"
                            placeholder="Username"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            required
                            style={{
                                padding: '10px',
                                marginBottom: '10px',
                                borderRadius: '5px',
                                border: '1px solid #ccc',
                                backgroundColor: '#f9f9f9', // Changed background color
                            }}
                            autoComplete="username"
                        />
                    </div>
                    <div>
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            style={{
                                padding: '10px',
                                marginBottom: '10px',
                                borderRadius: '5px',
                                border: '1px solid #ccc',
                                backgroundColor: '#f9f9f9', // Changed background color
                            }}
                            autoComplete="email"
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            style={{
                                padding: '10px',
                                marginBottom: '10px',
                                borderRadius: '5px',
                                border: '1px solid #ccc',
                                backgroundColor: '#f9f9f9', // Changed background color
                            }}
                            autoComplete="new-password"
                        />
                    </div>
                    <button type="submit">Create Account</button>
                </form>
            </div>
        </div>
    );
};

export default CreateAccount;