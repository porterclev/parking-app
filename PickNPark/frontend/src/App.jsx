import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Home from './Home';
import CreateAccount from './CreateAccount';
import MapComponent from './mapcomponent';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/home" element={<Home />} />
                <Route path="/create-account" element={<CreateAccount />} />
            </Routes>
        </Router>
    );
}

export default App;
