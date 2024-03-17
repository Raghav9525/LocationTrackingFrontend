import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Signup from './Signup';
import LocationTracker from './LocationTracker'; // Assuming LocationTracker component is located in './components/LocationTracker'

import Home from './Home'
import Login from './Login'
import { Navigate } from 'react-router-dom';
import LocationHistory from './LocationHistory';
import About from './About'
import LocationDelete from './LocationDelete';

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" replace />;
};


function Dashboard() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/location" element={
          <PrivateRoute>
            <LocationTracker />
          </PrivateRoute>
        } />

        <Route path="/location_history" element={
          <PrivateRoute>
            <LocationHistory/>
          </PrivateRoute>
        } />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/about" element={<About />} />
        <Route path="/location_delete" element={<LocationDelete />} />

      </Routes>

    </div>
  );
}

export default Dashboard;
