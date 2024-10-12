import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { SocketProvider } from './Socket';
import ManageFuel from './components/managefuel';
import Restock from './components/restockrequests';
import Home from './components/Homepage';

const App = () => {
    return (
        <SocketProvider>
            <Router>
                <div>
                    <center>
                    <nav>
                        <Link to="/">Home</Link> <br></br>
                        <Link to="/manage-fuel">Manage Fuel</Link> <br></br>
                        <Link to="/restock-requests">RestockRequests</Link>
                    </nav>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/manage-fuel" element={<ManageFuel />} />
                        <Route path="/restock-requests" element={<Restock />} />
                    </Routes>
                    </center>
                </div>
            </Router>
        </SocketProvider>
    );
};

export default App;
