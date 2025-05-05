import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
    id: string;
    email: string;
    username?: string;
}

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (email: string, password: string) => Promise<void>;
    signup: (email: string, password: string, name?: string) => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading,] = useState<boolean>(true);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    const login = async (identifier: string, password: string) => {
        setIsLoading(true);
        try {
            const response = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    identifier, // Send the identifier (email or username)
                    password,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                alert('Login successful!');
                setIsAuthenticated(true);
                // Save the token to localStorage or cookies if needed
                localStorage.setItem('token', data.token);
                setUser(data.user);
                // Redirect to the homepage
            } else {
                alert(data.message || 'Invalid email/username or password');
            }
        } catch (error) {
            console.error('Error during login:', error);
            alert('An error occurred. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const signup = async (email: string, password: string, userName: string) => {
        setIsLoading(true);
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
                localStorage.setItem('token', data.token);
                setUser(data.user);
                setIsAuthenticated(true);
                // Redirect to the login page
            } else {
                alert(data.message || 'Failed to create account');
            }
        } catch (error) {
            console.error('Error creating account:', error);
            alert('An error occurred. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const logout = async () => {
        localStorage.removeItem('token');
        setUser(null);
        setIsAuthenticated(false);
    };

    const value: AuthContextType = {
        user,
        isAuthenticated,
        isLoading,
        login,
        signup,
        logout,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};