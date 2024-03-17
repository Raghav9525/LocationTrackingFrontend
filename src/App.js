
import Home from './components/SocketIO';
import LocationTracker from './components/LocationTracker';
import { BrowserRouter } from 'react-router-dom'
import Dashboard from './components/Dashboard';
import Signup from './components/Signup';
import { NavLink, BrowserRouter as Router } from 'react-router-dom';
import Login from './components/Login';
import Footer from './components/Footer';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="App">
      {/* <Home /> */}
      {/* <LocationTracker /> */}
      {/* <Router>
        <Login />
            <Signup />
        </Router> */}

      <BrowserRouter>
        <Navbar />
        <Dashboard />
        <Footer />
      </BrowserRouter>

    </div>
  );
}

export default App;
