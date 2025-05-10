import {useEffect, useState} from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {useAuth} from "../context/AuthContext.js";

const Login = () => {
    const [identifier, setIdentifier] = useState(''); // Can be email or username
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { login, isAuthenticated } = useAuth();

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/');
        }
    }, [isAuthenticated]);

   const handleSubmit = async (e) => {
        e.preventDefault();
        await login(identifier, password);
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
                fontSize:"5rem",
                paddingBottom:"20px"}}>Login</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <input
                        type="text"
                        placeholder="Email or Username"
                        value={identifier}
                        onChange={(e) => setIdentifier(e.target.value)}
                        required
                        style={{
                            padding: '10px',
                            marginBottom: '10px',
                            borderRadius: '5px',
                            border: '1px solid #ccc',
                            backgroundColor: '#f9f9f9', // Changed background color
                        }}
                    />
                </div>
                <div>
                    <input
                        type="password"
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
                    />
                </div>
                <button type="submit">Login</button>
            </form>
            <p>
                Don't have an account? <Link to="/create-account">Create one</Link>
            </p>
            </div>
            
        </div>
    );
};

export default Login;