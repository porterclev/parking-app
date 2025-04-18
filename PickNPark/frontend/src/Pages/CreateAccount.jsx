import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateAccount = () => {
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

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
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>Create Account</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <input
                        type="text"
                        placeholder="Username"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Create Account</button>
            </form>
        </div>
    );
};

export default CreateAccount;