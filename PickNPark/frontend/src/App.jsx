import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


import Navbar from './components/Navbar/navcomponent';
import Footer from './components/Footer/footercomponent';
import Home from './Pages/Home';
import Login from './Pages/Login';
import CreateAccount from './Pages/CreateAccount';
import About from './Pages/About';
import NoPage from './Pages/NoPage';
import FindParking from './Pages/FindParking';

function App() {
    return (
        <Router>
            <Navbar />
            <Routes>      
                <Route index element={<Home />} />
                <Route path="/about" element={<About/>}/>
                <Route path="/find-parking" element={<FindParking/>}/>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<CreateAccount />} />
                <Route path="*" element={<NoPage/>} />
            </Routes>
            <Footer />
        </Router>
    );
}

export default App;
