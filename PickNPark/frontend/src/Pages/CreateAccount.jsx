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
    await signup(userName, email, password);
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
                            placeholder="Username"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            required
                            style={{
                                padding: '10px',
                                marginBottom: '10px',
                                borderRadius: '5px',
                                border: '1px solid #ccc',
                            }}
                        />
                    </div>
                    <div>
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            style={{
                                padding: '10px',
                                marginBottom: '10px',
                                borderRadius: '5px',
                                border: '1px solid #ccc',
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
                            }}
                        />
                    </div>
                    <button type="submit">Create Account</button>
                </form>
            </div>
        </div>
    );
};

export default CreateAccount;